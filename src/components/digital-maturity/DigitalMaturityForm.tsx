import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CONSENT_TEXT,
  INDUSTRIES,
  MAX_OTHER_INDUSTRIES,
  NO_OTHER_INDUSTRY,
  OTHER_INDUSTRY,
  QUESTIONS,
  REGIONS,
  SIZES,
  STEPS,
  UKRAINE,
  type Question,
} from '@/constants/digitalMaturity';
import { CheckList, InvestTable, QuestionHeader, RowsQuestion, ScaleLegend } from './questions';
import {
  DRAFT_KEY,
  OTHER_COUNTRY,
  emptyAnswers,
  stepErrors,
  toPayload,
  toggleIndex,
  toggleOther,
  validate,
  type Answers,
  type FieldKey,
} from './state';
import {
  Banner,
  CheckIcon,
  CheckRow,
  Chevron,
  Combobox,
  FieldError,
  FieldLabel,
  SelectField,
  Spinner,
  TextField,
} from './ui';

const TOTAL = STEPS.length;

const PRIMARY_BUTTON =
  'inline-flex items-center justify-center gap-2.5 rounded-2xl bg-blue-secondary font-raleway font-bold text-white transition-colors enabled:hover:bg-blue-secondary-hover disabled:cursor-not-allowed disabled:opacity-45';
const SECONDARY_BUTTON =
  'inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-form-line bg-white font-raleway font-bold text-blue-primary transition-colors hover:border-blue-secondary';

const scrollTo = (el: Element | null) => {
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: 'smooth' });
};

export default function DigitalMaturityForm() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [attempted, setAttempted] = useState<Record<number, boolean>>({});
  const [restored, setRestored] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Only write the draft after the user actually changed something.
  const dirty = useRef(false);

  useEffect(() => {
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
      if (draft?.a) {
        setAnswers({ ...emptyAnswers(), ...draft.a, hp: '' });
        setStep(draft.step || 1);
        setMaxStep(draft.maxStep || draft.step || 1);
        setRestored(true);
      }
    } catch {
      // Storage unavailable (private mode etc.) — start fresh.
    }
  }, []);

  useEffect(() => {
    if (!dirty.current || done) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ step, maxStep, a: answers }));
    } catch {
      // Ignore: the draft is a convenience only.
    }
  }, [answers, step, maxStep, done]);

  const update = useCallback((patch: Partial<Answers> | ((a: Answers) => Partial<Answers>)) => {
    dirty.current = true;
    setAnswers(a => ({ ...a, ...(typeof patch === 'function' ? patch(a) : patch) }));
  }, []);

  const touch = (key: FieldKey) => setTouched(t => ({ ...t, [key]: true }));
  const shown = (key: FieldKey) => Boolean(touched[key] || attempted[step]);
  const err = (key: FieldKey) => (shown(key) ? validate(key, answers) : '');

  const errors = stepErrors(step, answers);
  const stepValid = errors.length === 0;

  const goTo = (n: number) => {
    dirty.current = true;
    setStep(n);
    setMaxStep(m => Math.max(m, n));
    setSubmitError('');
    requestAnimationFrame(() => scrollTo(cardRef.current));
  };

  // Shows errors and moves focus to the first invalid field.
  const check = () => {
    if (stepValid) return true;
    setAttempted(a => ({ ...a, [step]: true }));
    requestAnimationFrame(() => {
      const el = rootRef.current?.querySelector(`[data-field="${errors[0]}"]`) ?? null;
      scrollTo(el);
      el?.querySelector<HTMLElement>('input,select,button')?.focus({ preventScroll: true });
    });
    return false;
  };

  const restart = () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
    dirty.current = false;
    setAnswers(emptyAnswers());
    setStep(1);
    setMaxStep(1);
    setTouched({});
    setAttempted({});
    setRestored(false);
    setSubmitError('');
  };

  const submit = async () => {
    if (submitting || !check()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify(toPayload(answers)),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(res.status === 429 ? body?.errors?.[0]?.message : '');
      }
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
      dirty.current = false;
      setDone(true);
      setRestored(false);
      requestAnimationFrame(() => scrollTo(rootRef.current));
    } catch (e) {
      setSubmitError(
        (e as Error).message ||
          'Не вдалося надіслати. Спробуйте ще раз — ваші відповіді збережено.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const current = STEPS[step - 1];
  const stepQuestions = QUESTIONS.filter(q => q.step === step);

  return (
    <div ref={rootRef} className='flex w-full flex-col gap-6'>
      <h1 className='font-raleway text-xl font-bold leading-[1.3] text-blue-primary text-balance lg:text-2xl'>
        Анкета для оцінювання цифрової зрілості МСП
      </h1>

      {restored && !done && (
        <div className='flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-form-line bg-form-soft px-[18px] py-3 text-base leading-normal'>
          <span>Ми відновили ваші відповіді після перезавантаження сторінки.</span>
          <button
            type='button'
            onClick={restart}
            className='cursor-pointer py-2.5 text-base font-semibold text-blue-primary underline underline-offset-2'
          >
            Почати заново
          </button>
        </div>
      )}

      {done ? (
        <Success />
      ) : (
        <>
          <Stepper
            step={step}
            maxStep={maxStep}
            onCurrent={() => scrollTo(cardRef.current)}
            onGo={n => {
              if (n < step) goTo(n);
              else if (n <= maxStep && check()) goTo(n);
            }}
          />

          <div
            ref={cardRef}
            className='flex flex-col gap-8 rounded-[32px] bg-white pb-6 md:border md:border-form-line md:p-8'
          >
            <div className='flex flex-col gap-2.5'>
              <h2 className='font-raleway text-xl font-bold leading-[1.3] text-blue-primary text-balance md:text-[22px]'>
                {current.title}
              </h2>
              <p className='text-base leading-[1.65] text-form-muted text-pretty'>{current.intro}</p>
            </div>

            {step === 1 && (
              <CompanyStep answers={answers} update={update} touch={touch} err={err} />
            )}

            {stepQuestions.map(q => (
              <QuestionBlock
                key={q.id}
                q={q}
                answers={answers}
                update={update}
                error={err(q.id as FieldKey)}
                showMissing={shown(q.id as FieldKey)}
              />
            ))}

            {step === TOTAL && (
              <div
                data-field='consent'
                className='relative flex flex-col gap-2 border-t border-form-line pt-2'
              >
                <CheckRow
                  label={
                    <>
                      {CONSENT_TEXT}
                      <span className='text-form-error'> *</span>
                    </>
                  }
                  checked={answers.consent}
                  invalid={Boolean(err('consent'))}
                  onToggle={() => {
                    update(a => ({ consent: !a.consent }));
                    touch('consent');
                  }}
                />
                <FieldError>{err('consent')}</FieldError>
                {/* Honeypot: hidden from people, bots tend to fill it in. */}
                <input
                  type='text'
                  name='company_fax'
                  tabIndex={-1}
                  autoComplete='off'
                  aria-hidden
                  value={answers.hp}
                  onChange={e => update({ hp: e.target.value })}
                  className='absolute -left-[9999px] size-px opacity-0'
                />
              </div>
            )}

            {submitError && <Banner>{submitError}</Banner>}
            {attempted[step] && !stepValid && <Banner>Заповніть обов'язкові поля</Banner>}

            <Navigation
              step={step}
              disabled={!stepValid}
              submitting={submitting}
              onBack={() => goTo(step - 1)}
              onNext={() => check() && goTo(step + 1)}
              onSubmit={submit}
            />
          </div>
        </>
      )}
    </div>
  );
}

interface StepProps {
  answers: Answers;
  update: (patch: Partial<Answers> | ((a: Answers) => Partial<Answers>)) => void;
  touch: (key: FieldKey) => void;
  err: (key: FieldKey) => string;
}

function CompanyStep({ answers: a, update, touch, err }: StepProps) {
  const text = (
    key: FieldKey,
    label: string,
    props: Partial<Parameters<typeof TextField>[0]> = {},
  ) => (
    <TextField
      name={key}
      label={label}
      value={a[key] as string}
      onChange={v => update({ [key]: v })}
      onBlur={() => touch(key)}
      error={err(key)}
      required
      {...props}
    />
  );
  const ukraine = a.countryMode !== OTHER_COUNTRY;
  const noneOn = a.other.includes(NO_OTHER_INDUSTRY);
  const count = a.other.filter(v => v !== NO_OTHER_INDUSTRY).length;

  const otherOption = (value: string, label: string) => {
    const checked = a.other.includes(value);
    const disabled =
      !checked && value !== NO_OTHER_INDUSTRY && (noneOn || count >= MAX_OTHER_INDUSTRIES);
    return (
      <CheckRow
        key={value}
        compact
        label={label}
        checked={checked}
        disabled={disabled}
        onToggle={() => update(s => ({ other: toggleOther(s.other, value) }))}
      />
    );
  };

  return (
    <>
      <div className='flex flex-col gap-5'>
        <h3 className='font-raleway text-xl font-bold leading-[1.4] text-blue-primary'>Загальні дані</h3>
        <div className='grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2'>
          {text('name', 'Назва підприємства', { fullWidth: true, autoComplete: 'organization' })}
          {text(
            'taxId',
            'Ідентифікаційний податковий номер (номер платника ПДВ або рівнозначний номер)',
            { fullWidth: true, inputMode: 'numeric' },
          )}
          {text('contact', 'Контактна особа', { placeholder: 'ПІБ', autoComplete: 'name' })}
          {text('position', 'Посада на підприємстві', { autoComplete: 'organization-title' })}
          {text('email', 'Адреса ел. пошти', {
            type: 'email',
            inputMode: 'email',
            autoComplete: 'email',
          })}
          {text('phone', 'Телефон', {
            type: 'tel',
            inputMode: 'tel',
            placeholder: '+380 XX XXX XX XX',
            autoComplete: 'tel',
          })}
          {text('website', 'Вебсайт', { required: false, inputMode: 'url', autoComplete: 'url' })}
          {text('year', 'Рік заснування підприємства', { inputMode: 'numeric' })}
        </div>

        <div data-field='size' role='radiogroup' aria-label='Чисельність персоналу' className='flex flex-col gap-2.5'>
          <FieldLabel required>Чисельність персоналу підприємства</FieldLabel>
          <div className='grid grid-cols-2 gap-3'>
            {SIZES.map(size => {
              const checked = a.size === size;
              return (
                <button
                  key={size}
                  type='button'
                  role='radio'
                  aria-checked={checked}
                  onClick={() => update({ size })}
                  onBlur={() => touch('size')}
                  className={`flex min-h-16 cursor-pointer items-center gap-2.5 rounded-2xl border-2 p-4 text-left hover:border-blue-secondary ${
                    checked ? 'border-blue-secondary bg-form-selected' : 'border-form-line bg-white'
                  }`}
                >
                  <span
                    className={`flex size-5 flex-none items-center justify-center rounded-full border-2 ${
                      checked ? 'border-blue-primary' : 'border-form-input'
                    }`}
                  >
                    {checked && <span className='size-2.5 rounded-full bg-blue-primary' />}
                  </span>
                  <span className='font-raleway text-lg font-bold text-blue-primary'>{size}</span>
                </button>
              );
            })}
          </div>
          <FieldError>{err('size')}</FieldError>
        </div>

        <div className='grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2'>
          <SelectField
            name='countryMode'
            label='Країна знаходження підрозділу підприємства'
            required
            value={ukraine ? UKRAINE : OTHER_COUNTRY}
            options={[
              { value: UKRAINE, label: 'Україна' },
              { value: OTHER_COUNTRY, label: 'Інша країна' },
            ]}
            onChange={countryMode => update({ countryMode })}
          />
          {ukraine ? (
            <SelectField
              name='region'
              label='Регіон знаходження підрозділу (область)'
              required
              value={a.region}
              placeholder='Оберіть регіон'
              options={REGIONS.map(r => ({ value: r, label: r }))}
              onChange={region => update({ region })}
              onBlur={() => touch('region')}
              error={err('region')}
            />
          ) : (
            <>
              {text('country', 'Назва країни', { autoComplete: 'country-name' })}
              {text('regionText', 'Регіон знаходження підрозділу', {
                autoComplete: 'address-level1',
              })}
            </>
          )}
          {text('zip', 'Поштовий індекс', {
            inputMode: ukraine ? 'numeric' : 'text',
            autoComplete: 'postal-code',
          })}
          {text('address', 'Повна адреса', { autoComplete: 'street-address' })}
        </div>
      </div>

      <div className='h-px bg-form-line' />

      <div className='flex flex-col gap-5'>
        <h3 className='font-raleway text-xl font-bold leading-[1.4] text-blue-primary'>Галузь діяльності</h3>

        <Combobox
          name='industry'
          label='Переважно в якій галузі зосереджено підприємницьку діяльність підприємства?'
          required
          value={a.industry}
          options={INDUSTRIES}
          placeholder='Оберіть галузь'
          searchPlaceholder='Пошук галузі'
          error={err('industry')}
          onChange={industry => {
            update(s => ({ industry, other: s.other.filter(v => v !== industry) }));
            touch('industry');
          }}
        />

        <div data-field='otherText' className='flex flex-col gap-3'>
          <div className='flex flex-wrap items-baseline justify-between gap-4'>
            <span className='flex-[1_1_420px] text-base font-semibold leading-snug text-blue-primary'>
              Окрім того, у яких інших галузях діяльності вже працює / бажає працювати підприємство?
            </span>
            <span
              className={`whitespace-nowrap text-[15px] font-semibold ${
                count >= MAX_OTHER_INDUSTRIES ? 'text-blue-primary' : 'text-form-muted'
              }`}
            >
              {noneOn ? 'Жодна інша галузь' : `Вибрано ${count} з ${MAX_OTHER_INDUSTRIES}`}
            </span>
          </div>
          <span className='-mt-1.5 text-[15px] text-form-muted'>Щонайбільше 3 варіанти.</span>

          <div className='grid grid-cols-1 gap-2.5 md:grid-cols-2'>
            {INDUSTRIES.filter(i => i !== a.industry).map(i => otherOption(i, i))}
          </div>
          <div className='mt-1 h-px bg-form-line' />
          <div className='grid grid-cols-1 gap-2.5 md:grid-cols-2'>
            {otherOption(OTHER_INDUSTRY, 'Інша галузь діяльності, не зазначена вище')}
            {otherOption(NO_OTHER_INDUSTRY, 'Жодна інша галузь діяльності')}
          </div>
          {a.other.includes(OTHER_INDUSTRY) &&
            text('otherText', 'Вкажіть галузь', { name: 'otherTextInput' })}
        </div>
      </div>
    </>
  );
}

interface QuestionBlockProps {
  q: Question;
  answers: Answers;
  update: StepProps['update'];
  error: string;
  showMissing: boolean;
}

function QuestionBlock({ q, answers, update, error, showMissing }: QuestionBlockProps) {
  return (
    <div data-field={q.id} className='flex flex-col gap-4'>
      <QuestionHeader q={q} error={error} />
      {q.type === 'scale' && <ScaleLegend />}
      {q.type === 'check' && (
        <CheckList
          q={q}
          value={answers[q.id] as number[]}
          onToggle={i =>
            update(a => ({ [q.id]: toggleIndex(a[q.id] as number[], i, q.exclusive) }))
          }
        />
      )}
      {(q.type === 'scale' || q.type === 'tri') && (
        <RowsQuestion
          q={q}
          value={answers[q.id] as Record<number, number>}
          showMissing={showMissing}
          onPick={(row, v) =>
            update(a => ({ [q.id]: { ...(a[q.id] as Record<number, number>), [row]: v } }))
          }
        />
      )}
      {q.type === 'invest' && (
        <InvestTable
          q={q}
          value={answers.q1}
          onToggle={(row, key) =>
            update(a => {
              const r = a.q1[row] ?? {};
              return { q1: { ...a.q1, [row]: { ...r, [key]: !r[key] } } };
            })
          }
        />
      )}
    </div>
  );
}

interface StepperProps {
  step: number;
  maxStep: number;
  onCurrent: () => void;
  onGo: (n: number) => void;
}

function Stepper({ step, maxStep, onCurrent, onGo }: StepperProps) {
  return (
    <>
      <div role='list' aria-label='Кроки анкети' className='hidden grid-cols-7 md:grid'>
        {STEPS.map(s => {
          const isCurrent = s.n === step;
          const passed = s.n < maxStep && !isCurrent;
          const reachable = s.n <= maxStep;
          return (
            <button
              key={s.n}
              type='button'
              role='listitem'
              disabled={!reachable}
              aria-current={isCurrent ? 'step' : undefined}
              onClick={() => (isCurrent ? onCurrent() : onGo(s.n))}
              className={`relative flex flex-col items-center gap-2.5 px-1 ${
                reachable ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              {s.n > 1 && (
                <span
                  className={`absolute left-[calc(-50%+26px)] right-[calc(50%+26px)] top-[19px] h-0.5 rounded-sm ${
                    s.n <= maxStep ? 'bg-blue-secondary' : 'bg-form-line'
                  }`}
                />
              )}
              <span
                className={`flex size-10 items-center justify-center rounded-full border-2 font-raleway text-[17px] font-bold ${
                  passed
                    ? 'border-blue-secondary bg-blue-secondary'
                    : isCurrent
                      ? 'border-blue-primary bg-blue-primary text-white'
                      : 'border-form-line bg-white text-form-muted'
                }`}
              >
                {passed ? <CheckIcon size={20} stroke={3} /> : s.n}
              </span>
              <span
                className={`text-center text-sm leading-[1.3] text-balance ${
                  isCurrent ? 'font-bold text-blue-primary' : 'text-form-muted'
                }`}
              >
                {s.short}
              </span>
            </button>
          );
        })}
      </div>

      <div className='flex flex-col gap-2.5 md:hidden'>
        <div className='flex items-baseline justify-between gap-3 text-base'>
          <span className='font-raleway font-bold text-blue-primary'>
            Крок {step} з {TOTAL}
          </span>
          <span className='text-right text-form-muted'>{STEPS[step - 1].short}</span>
        </div>
        <div className='h-2 overflow-hidden rounded-lg bg-form-track'>
          <div
            className='h-full rounded-lg bg-blue-secondary transition-[width] duration-300'
            style={{ width: `${Math.round((step / TOTAL) * 100)}%` }}
          />
        </div>
      </div>
    </>
  );
}

interface NavigationProps {
  step: number;
  disabled: boolean;
  submitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

// Inline at the bottom of the card on desktop, sticky bottom bar on mobile.
function Navigation({ step, disabled, submitting, onBack, onNext, onSubmit }: NavigationProps) {
  const last = step === TOTAL;
  return (
    <div className='sticky bottom-0 z-20 -mx-5 -mb-6 flex gap-2.5 border-t border-form-line bg-white px-5 pb-4 pt-3 md:static md:mx-0 md:mb-0 md:justify-between md:gap-4 md:px-0 md:pb-0 md:pt-6'>
      {step > 1 ? (
        <button
          type='button'
          onClick={onBack}
          className={`${SECONDARY_BUTTON} min-h-[52px] flex-none px-[18px] text-[17px] md:min-h-14 md:px-7 md:text-lg`}
        >
          <Chevron dir='left' size={18} />
          Назад
        </button>
      ) : (
        <span className='hidden md:block' />
      )}
      {last ? (
        <button
          type='button'
          onClick={onSubmit}
          disabled={disabled || submitting}
          aria-busy={submitting}
          className={`${PRIMARY_BUTTON} min-h-[52px] flex-1 text-[17px] md:min-h-14 md:flex-none md:px-10 md:text-lg ${
            submitting ? 'cursor-progress disabled:opacity-75' : ''
          }`}
        >
          {submitting && <Spinner />}
          {submitting ? 'Надсилаємо…' : 'Надіслати'}
        </button>
      ) : (
        <button
          type='button'
          onClick={onNext}
          disabled={disabled}
          className={`${PRIMARY_BUTTON} min-h-[52px] flex-1 text-[17px] md:min-h-14 md:flex-none md:px-9 md:text-lg`}
        >
          Далі
          <Chevron dir='right' color='#fff' size={18} />
        </button>
      )}
    </div>
  );
}

function Success() {
  return (
    <div className='flex flex-col items-center gap-5 rounded-[32px] border border-form-line bg-white px-5 py-10 text-center md:px-10 md:py-14'>
      <div className='flex size-20 items-center justify-center rounded-full border-2 border-blue-secondary bg-form-selected'>
        <CheckIcon size={40} stroke={2.5} />
      </div>
      <h2 className='font-raleway text-xl font-bold leading-[1.3] text-blue-primary lg:text-2xl'>
        Дякуємо! Анкету надіслано
      </h2>
      <p className='max-w-[560px] text-lg leading-relaxed text-pretty lg:text-xl'>
        Команда NOSC-UA DIH зв'яжеться з вами найближчим часом за вказаною поштою або телефоном.
      </p>
      <Link
        href='/'
        className={`${PRIMARY_BUTTON} mt-2 min-h-14 px-9 text-lg no-underline`}
      >
        На головну
      </Link>
    </div>
  );
}
