import { useState } from 'react';
import { SCALE, TRI, type Question } from '@/constants/digitalMaturity';
import { Box, CheckRow, Required } from './ui';

export type RowValues = Record<number, number>;
export type InvestValues = Record<number, { d?: boolean; p?: boolean }>;

export const QuestionHeader = ({ q, error }: { q: Question; error?: string }) => (
  <div className='flex flex-col gap-1.5'>
    <h3 className='font-raleway text-xl font-bold leading-[1.4] text-blue-primary text-pretty'>
      {q.num}. {q.title}
      {q.required && <Required />}
    </h3>
    {q.hint && <p className='text-[15px] leading-normal text-form-muted'>{q.hint}</p>}
    {error && <p className='text-[15px] font-semibold text-form-error'>{error}</p>}
  </div>
);

interface CheckListProps {
  q: Question;
  value: number[];
  onToggle: (index: number) => void;
}

// "Select all that apply". The exclusive option (if any) goes last, after a
// divider, and clears/blocks the others.
export const CheckList = ({ q, value, onToggle }: CheckListProps) => {
  const exclusiveOn = q.exclusive != null && value.includes(q.exclusive);
  return (
    <div className='flex flex-col gap-2'>
      {q.options.map((label, i) => (
        <div key={i} className='contents'>
          {i === q.exclusive && <div className='my-1.5 h-px bg-form-line' />}
          <CheckRow
            label={label}
            checked={value.includes(i)}
            disabled={exclusiveOn && i !== q.exclusive}
            onToggle={() => onToggle(i)}
          />
        </div>
      ))}
    </div>
  );
};

export const ScaleLegend = () => (
  <div className='flex flex-wrap gap-x-[18px] gap-y-1.5 rounded-[14px] bg-form-soft px-4 py-3.5 text-sm leading-[1.4] text-blue-primary'>
    {SCALE.map((text, v) => (
      <span key={v}>
        <b>{v}</b> = {text}
      </span>
    ))}
  </div>
);

interface RowsProps {
  q: Question;
  value: RowValues;
  showMissing: boolean;
  onPick: (row: number, value: number) => void;
}

// 0–5 scale or Ні / Частково / Так for every row of the question.
export const RowsQuestion = ({ q, value, showMissing, onPick }: RowsProps) => {
  const [hover, setHover] = useState<Record<number, number | null>>({});
  const scale = q.type === 'scale';
  const choices = scale ? [0, 1, 2, 3, 4, 5] : [0, 1, 2];

  return (
    <div className='flex flex-col border-t border-form-track'>
      {q.options.map((label, row) => {
        const v = value[row];
        const missing = v == null && showMissing;
        const shown = hover[row] ?? v;
        return (
          <div
            key={row}
            className={`grid grid-cols-1 items-center gap-x-6 gap-y-3 border-b border-form-track py-3 ${
              scale ? 'md:grid-cols-[minmax(0,1fr)_330px]' : 'md:grid-cols-[minmax(0,1fr)_310px]'
            }`}
          >
            <div className='text-[17px] leading-normal text-pretty'>{label}</div>
            <div className='flex flex-col gap-1.5'>
              <div
                role='radiogroup'
                aria-label={label}
                className='flex gap-1.5'
                onMouseLeave={() => setHover(h => ({ ...h, [row]: null }))}
              >
                {choices.map(x => {
                  const on = v === x;
                  const text = scale ? String(x) : TRI[x].label;
                  return (
                    <button
                      key={x}
                      type='button'
                      role='radio'
                      aria-checked={on}
                      title={scale ? `${x} — ${SCALE[x]}` : text}
                      onClick={() => onPick(row, x)}
                      onMouseEnter={() => setHover(h => ({ ...h, [row]: x }))}
                      onFocus={() => setHover(h => ({ ...h, [row]: x }))}
                      className={`h-12 min-w-11 flex-1 cursor-pointer rounded-xl border-[1.5px] px-1.5 font-raleway font-bold text-blue-primary transition-colors ${
                        scale ? 'text-[17px]' : 'text-base'
                      } ${
                        on
                          ? 'border-blue-secondary bg-blue-secondary'
                          : `${hover[row] === x ? 'bg-form-selected' : 'bg-white'} ${
                              missing ? 'border-form-error' : 'border-form-input'
                            }`
                      }`}
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
              {scale && (
                <div
                  className={`min-h-5 text-sm leading-[1.4] ${
                    shown == null && missing ? 'text-form-error' : 'text-form-muted'
                  }`}
                >
                  {shown != null ? `${shown} — ${SCALE[shown]}` : missing ? 'Оберіть значення' : ''}
                </div>
              )}
              {!scale && missing && (
                <div className='text-sm leading-[1.4] text-form-error'>Оберіть варіант</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface InvestProps {
  q: Question;
  value: InvestValues;
  onToggle: (row: number, key: 'd' | 'p') => void;
}

const COLUMNS = [
  { key: 'd', label: 'Уже інвестувало' },
  { key: 'p', label: 'Планує інвестувати' },
] as const;

// Question 1: table on desktop, a card per row on mobile.
export const InvestTable = ({ q, value, onToggle }: InvestProps) => (
  <>
    <div role='table' className='hidden flex-col overflow-hidden rounded-2xl border border-form-line md:flex'>
      <div
        role='row'
        className='grid grid-cols-[minmax(0,1fr)_140px_140px] items-center border-b border-form-line bg-form-soft text-[15px] font-semibold text-blue-primary'
      >
        <div role='columnheader' className='px-[18px] py-3.5'>
          Сфера діяльності
        </div>
        {COLUMNS.map(c => (
          <div key={c.key} role='columnheader' className='px-2 py-3.5 text-center'>
            {c.label}
          </div>
        ))}
      </div>
      {q.options.map((label, row) => (
        <div
          key={row}
          role='row'
          className={`grid grid-cols-[minmax(0,1fr)_140px_140px] items-center ${
            row % 2 ? 'bg-[#FBFDFD]' : 'bg-white'
          } ${row === q.options.length - 1 ? '' : 'border-b border-form-track'}`}
        >
          <div role='cell' className='px-[18px] py-3.5 text-[17px] leading-normal text-pretty'>
            {label}
          </div>
          {COLUMNS.map(c => {
            const checked = Boolean(value[row]?.[c.key]);
            return (
              <div key={c.key} role='cell' className='flex justify-center'>
                <button
                  type='button'
                  role='checkbox'
                  aria-checked={checked}
                  aria-label={c.label}
                  onClick={() => onToggle(row, c.key)}
                  className='flex size-12 cursor-pointer items-center justify-center rounded-[10px] hover:bg-form-selected'
                >
                  <Box checked={checked} />
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>

    <div className='flex flex-col gap-2.5 md:hidden'>
      {q.options.map((label, row) => (
        <div key={row} className='flex flex-col gap-3 rounded-2xl border border-form-line p-3.5'>
          <div className='text-[17px] leading-normal'>{label}</div>
          <div className='grid grid-cols-2 gap-2'>
            {COLUMNS.map(c => {
              const checked = Boolean(value[row]?.[c.key]);
              return (
                <button
                  key={c.key}
                  type='button'
                  role='checkbox'
                  aria-checked={checked}
                  onClick={() => onToggle(row, c.key)}
                  className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border-[1.5px] px-2.5 py-2 text-left text-[15px] leading-[1.3] text-blue-primary ${
                    checked ? 'border-blue-secondary bg-form-selected' : 'border-form-line bg-white'
                  }`}
                >
                  <Box checked={checked} size={20} />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </>
);
