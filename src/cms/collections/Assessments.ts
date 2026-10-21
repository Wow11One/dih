import type { CollectionConfig, Field, FieldAccess, Validate } from 'payload';
import { APIError } from 'payload';
import {
  INDUSTRIES,
  MAX_OTHER_INDUSTRIES,
  NO_OTHER_INDUSTRY,
  OTHER_INDUSTRY,
  QUESTIONS,
  REGIONS,
  SIZES,
  STEPS,
  TRI,
  UKRAINE,
  toOptions,
  type Question,
} from '@/constants/digitalMaturity';
import { isAuthenticated } from '../access';
import { checkRateLimit } from '../utils/rateLimit';

// Answers are written once by the public form and are read-only afterwards;
// only the team's own fields (participant id, note) can be edited.
const readOnlyAfterCreate: FieldAccess = () => false;
const teamOnly = { create: () => false, update: () => true };

const requiredText =
  (message: string): Validate =>
  (value: unknown) =>
    String(value ?? '').trim() ? true : message;

const pattern =
  (regex: RegExp, message: string, normalize = (v: string) => v): Validate =>
  (value: unknown) => {
    const v = normalize(String(value ?? ''));
    if (!v) return message;
    return regex.test(v) ? true : message;
  };

const answer = (field: Field): Field =>
  ({
    ...field,
    access: { update: readOnlyAfterCreate },
    admin: { ...(field.admin ?? {}), readOnly: true },
  }) as Field;

const checkField = (q: Question, name: string = q.id, label = `${q.num}. ${q.title}`) =>
  answer({
    name,
    type: 'select',
    hasMany: true,
    label,
    options: toOptions(q.options),
    validate: (value: unknown) => {
      if (!Array.isArray(value) || q.exclusive == null) return true;
      const exclusive = String(q.exclusive + 1);
      return value.includes(exclusive) && value.length > 1
        ? 'Виключний варіант не можна поєднувати з іншими'
        : true;
    },
  });

// One sub-field per row (r1…rN) so each row becomes its own CSV column.
const rowsGroup = (q: Question): Field =>
  answer({
    name: q.id,
    type: 'group',
    label: `${q.num}. ${q.title}`,
    fields: q.options.map((row, i) =>
      q.type === 'tri'
        ? {
            name: `r${i + 1}`,
            type: 'select',
            label: row,
            required: true,
            options: TRI.map(t => ({ value: t.value, label: t.label })),
          }
        : {
            name: `r${i + 1}`,
            type: 'number',
            label: row,
            required: true,
            min: 0,
            max: 5,
          },
    ),
  });

const questionFields = (step: number): Field[] =>
  QUESTIONS.filter(q => q.step === step).flatMap((q): Field[] => {
    if (q.type === 'invest') {
      return [
        checkField(q, 'q1Invested', `${q.num}. ${q.title} — Уже інвестувало`),
        checkField(q, 'q1Planned', `${q.num}. ${q.title} — Планує інвестувати`),
      ];
    }
    if (q.type === 'check') return [checkField(q)];
    return [rowsGroup(q)];
  });

const isUkraine = (data: Record<string, unknown> | undefined) =>
  (data?.country ?? UKRAINE) === UKRAINE;

export const Assessments: CollectionConfig = {
  slug: 'assessments',
  labels: {
    singular: { uk: 'Анкета', en: 'Assessment' },
    plural: { uk: 'Анкети', en: 'Assessments' },
  },
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: [
      'createdAt',
      'companyName',
      'contactPerson',
      'email',
      'staffSize',
      'mainIndustry',
    ],
    listSearchableFields: ['companyName', 'email', 'contactPerson'],
    description: {
      uk: 'Анкети цифрової зрілості, надіслані з форми на сайті (/digital-maturity).',
      en: 'Digital maturity assessments submitted from the website form.',
    },
  },
  defaultSort: '-createdAt',
  access: {
    // Only the public form creates assessments; logged-in admins can't
    // (keeps the "Create" button out of the admin UI).
    create: ({ req: { user } }) => !user,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    beforeOperation: [
      ({ args, operation, req }) => {
        if (operation !== 'create' || req.user) return args;
        // Honeypot: a hidden field real people never fill in.
        if ((args.data as Record<string, unknown> | undefined)?.hp) {
          throw new APIError('Bad request', 400);
        }
        if (!checkRateLimit(req)) {
          throw new APIError(
            'Забагато відправок. Спробуйте пізніше.',
            429,
            undefined,
            true,
          );
        }
        return args;
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: STEPS[0].short,
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'participantId',
                  type: 'text',
                  label: 'ІНУ (ідентифікаційний номер учасника)',
                  access: teamOnly,
                  admin: { description: 'Заповнює команда DIH.' },
                },
                {
                  name: 'note',
                  type: 'textarea',
                  label: 'Внутрішня нотатка',
                  access: teamOnly,
                },
              ],
            },
            answer({
              name: 'companyName',
              type: 'text',
              label: 'Назва підприємства',
              required: true,
              index: true,
            }),
            answer({
              name: 'taxId',
              type: 'text',
              label: 'Податковий номер',
              validate: pattern(/^\d{8,12}$/, 'Лише цифри, від 8 до 12 символів', v =>
                v.replace(/\s/g, ''),
              ),
            }),
            answer({
              name: 'contactPerson',
              type: 'text',
              label: 'Контактна особа',
              validate: requiredText('Вкажіть контактну особу'),
            }),
            answer({
              name: 'position',
              type: 'text',
              label: 'Посада на підприємстві',
              validate: requiredText('Вкажіть посаду'),
            }),
            answer({
              name: 'email',
              type: 'email',
              label: 'Ел. пошта',
              required: true,
              index: true,
            }),
            answer({
              name: 'phone',
              type: 'text',
              label: 'Телефон',
              validate: pattern(/^\+\d{10,15}$/, 'Невірний формат телефону', v =>
                v.replace(/[\s()-]/g, ''),
              ),
            }),
            answer({ name: 'website', type: 'text', label: 'Вебсайт' }),
            answer({
              name: 'staffSize',
              type: 'select',
              label: 'Чисельність персоналу',
              required: true,
              options: toOptions(SIZES),
            }),
            answer({
              name: 'foundedYear',
              type: 'number',
              label: 'Рік заснування',
              required: true,
              min: 1900,
              max: new Date().getFullYear(),
            }),
            answer({
              name: 'country',
              type: 'text',
              label: 'Країна',
              required: true,
              defaultValue: UKRAINE,
            }),
            answer({
              name: 'region',
              type: 'text',
              label: 'Регіон',
              validate: (value: unknown, { data }) => {
                const v = String(value ?? '').trim();
                if (!v) return 'Вкажіть регіон';
                return !isUkraine(data) || REGIONS.includes(v)
                  ? true
                  : 'Оберіть регіон зі списку';
              },
            }),
            answer({
              name: 'postalCode',
              type: 'text',
              label: 'Поштовий індекс',
              validate: (value: unknown, { data }) => {
                const v = String(value ?? '').trim();
                if (!v) return 'Вкажіть поштовий індекс';
                return !isUkraine(data) || /^\d{5}$/.test(v)
                  ? true
                  : 'Індекс має містити 5 цифр';
              },
            }),
            answer({
              name: 'address',
              type: 'text',
              label: 'Повна адреса',
              validate: requiredText('Вкажіть повну адресу'),
            }),
            answer({
              name: 'mainIndustry',
              type: 'select',
              label: 'Основна галузь',
              required: true,
              options: toOptions(INDUSTRIES),
            }),
            answer({
              name: 'otherIndustries',
              type: 'select',
              hasMany: true,
              label: 'Інші галузі',
              options: [
                ...toOptions(INDUSTRIES),
                { value: OTHER_INDUSTRY, label: 'Інша галузь діяльності' },
                { value: NO_OTHER_INDUSTRY, label: 'Жодна інша галузь діяльності' },
              ],
              validate: (value: unknown, { data }) => {
                const v = Array.isArray(value) ? value : [];
                if (v.includes(NO_OTHER_INDUSTRY) && v.length > 1) {
                  return '«Жодна інша галузь» не поєднується з іншими';
                }
                if (v.length > MAX_OTHER_INDUSTRIES) {
                  return `Щонайбільше ${MAX_OTHER_INDUSTRIES} варіанти`;
                }
                if (v.includes((data as { mainIndustry?: string })?.mainIndustry)) {
                  return 'Основна галузь не може бути серед інших';
                }
                return true;
              },
            }),
            answer({
              name: 'otherIndustryText',
              type: 'text',
              label: 'Інша галузь (вказана)',
              validate: (value: unknown, { data }) => {
                const other = (data as { otherIndustries?: string[] })?.otherIndustries;
                return other?.includes(OTHER_INDUSTRY) && !String(value ?? '').trim()
                  ? 'Вкажіть галузь'
                  : true;
              },
            }),
          ],
        },
        ...STEPS.slice(1).map(step => ({
          label: step.short,
          fields: questionFields(step.n),
        })),
        {
          label: 'Згода',
          fields: [
            answer({
              name: 'consent',
              type: 'checkbox',
              label: 'Згода на обробку персональних даних',
              required: true,
              validate: (value: unknown) =>
                value === true ? true : 'Потрібна ваша згода на обробку даних',
            }),
          ],
        },
      ],
    },
  ],
};
