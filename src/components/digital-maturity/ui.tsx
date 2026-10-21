import {
  type ChangeEvent,
  type HTMLInputTypeAttribute,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

const FOCUS =
  'outline-none focus:border-blue-secondary focus:shadow-[0_0_0_3px_rgba(82,188,195,.25)]';

export const CheckIcon = ({ size = 15, stroke = 3.5 }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden>
    <path
      d='M5 12.5l4.5 4.5L19 7.5'
      stroke='#0A2752'
      strokeWidth={stroke}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const Chevron = ({ dir = 'down', color = '#0A2752', size = 20 }) => {
  const d = {
    down: 'M19 9l-7 7-7-7',
    left: 'M15 19l-7-7 7-7',
    right: 'M9 5l7 7-7 7',
  }[dir];
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden>
      <path d={d} stroke={color} strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export const AlertIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' className='flex-none' aria-hidden>
    <circle cx='12' cy='12' r='9' stroke='#C62828' strokeWidth='2' />
    <path d='M12 7.5v5.5M12 16.2v.3' stroke='#C62828' strokeWidth='2.2' strokeLinecap='round' />
  </svg>
);

export const Spinner = () => (
  <span
    aria-hidden
    className='inline-block size-[18px] flex-none animate-spin rounded-full border-[2.5px] border-white/45 border-t-white'
  />
);

export const Required = () => <span className='text-form-error'> *</span>;

export const FieldError = ({ children }: { children?: string }) =>
  children ? <span className='text-[15px] leading-snug text-form-error'>{children}</span> : null;

export const FieldLabel = ({ children, required }: { children: ReactNode; required?: boolean }) => (
  <span className='text-base font-semibold leading-snug text-blue-primary'>
    {children}
    {required && <Required />}
  </span>
);

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  inputMode?: 'text' | 'numeric' | 'email' | 'tel' | 'url';
  autoComplete?: string;
  fullWidth?: boolean;
}

export const TextField = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  type = 'text',
  placeholder,
  inputMode,
  autoComplete = 'off',
  fullWidth,
}: TextFieldProps) => (
  <label data-field={name} className={`flex flex-col gap-2 ${fullWidth ? 'md:col-span-2' : ''}`}>
    <FieldLabel required={required}>{label}</FieldLabel>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      inputMode={inputMode}
      autoComplete={autoComplete}
      aria-invalid={Boolean(error)}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      onBlur={onBlur}
      className={`h-[52px] w-full rounded-xl border-[1.5px] bg-white px-4 text-lg text-black placeholder:text-form-input ${
        error ? 'border-form-error' : 'border-form-input'
      } ${FOCUS}`}
    />
    <FieldError>{error}</FieldError>
  </label>
);

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const SelectField = ({
  name,
  label,
  value,
  options,
  onChange,
  onBlur,
  placeholder,
  error,
  required,
}: SelectFieldProps) => (
  <label data-field={name} className='flex flex-col gap-2'>
    <FieldLabel required={required}>{label}</FieldLabel>
    <span className='relative block'>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        className={`h-[52px] w-full cursor-pointer appearance-none rounded-xl border-[1.5px] bg-white pl-4 pr-11 text-lg ${
          value ? 'text-black' : 'text-form-placeholder'
        } ${error ? 'border-form-error' : 'border-form-input'} ${FOCUS}`}
      >
        {placeholder && <option value=''>{placeholder}</option>}
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className='pointer-events-none absolute right-4 top-4'>
        <Chevron />
      </span>
    </span>
    <FieldError>{error}</FieldError>
  </label>
);

interface CheckRowProps {
  label: ReactNode;
  checked: boolean;
  disabled?: boolean;
  invalid?: boolean;
  onToggle: () => void;
  compact?: boolean;
}

// A full-width clickable row with a custom checkbox.
export const CheckRow = ({ label, checked, disabled, invalid, onToggle, compact }: CheckRowProps) => (
  <button
    type='button'
    role='checkbox'
    aria-checked={checked}
    disabled={disabled}
    onClick={onToggle}
    className={`flex min-h-[52px] items-start text-left text-[17px] text-black transition-colors enabled:hover:border-blue-secondary disabled:cursor-not-allowed disabled:opacity-45 ${
      compact ? 'gap-3 rounded-[14px] px-3.5 py-[13px] leading-[1.4]' : 'gap-3.5 rounded-2xl px-4 py-3 leading-normal'
    } border-[1.5px] ${
      invalid
        ? 'border-form-error'
        : checked
          ? 'border-blue-secondary bg-form-selected'
          : 'border-form-line bg-white'
    }`}
  >
    <Box checked={checked} size={compact ? 22 : 24} />
    <span className='text-pretty'>{label}</span>
  </button>
);

export const Box = ({ checked, size = 24 }: { checked: boolean; size?: number }) => (
  <span
    style={{ width: size, height: size }}
    className={`mt-px flex flex-none items-center justify-center rounded-md border-2 ${
      checked ? 'border-blue-secondary bg-blue-secondary' : 'border-blue-primary bg-white'
    }`}
  >
    {checked && <CheckIcon size={size <= 20 ? 12 : size <= 22 ? 14 : 15} />}
  </span>
);

export const Banner = ({ children }: { children: ReactNode }) => (
  <div
    role='alert'
    className='flex items-center gap-3 rounded-[14px] border border-form-error-line bg-form-error-bg px-[18px] py-3.5 text-base leading-normal text-form-error-text'
  >
    <AlertIcon />
    <span>{children}</span>
  </div>
);

interface ComboboxProps {
  name: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  error?: string;
  required?: boolean;
}

// Select with a search box (used for the 22 industries).
export const Combobox = ({
  name,
  label,
  value,
  options,
  onChange,
  placeholder,
  searchPlaceholder,
  error,
  required,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const q = query.trim().toLowerCase();
  const items = options.filter(o => !q || o.toLowerCase().includes(q));
  const pick = (item: string) => {
    onChange(item);
    close();
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' && items[0]) {
      e.preventDefault();
      pick(items[0]);
    }
  };

  return (
    <div ref={rootRef} data-field={name} className='relative flex flex-col gap-2'>
      <FieldLabel required={required}>{label}</FieldLabel>
      <button
        type='button'
        aria-expanded={open}
        aria-haspopup='listbox'
        onClick={() => (open ? close() : setOpen(true))}
        className={`flex min-h-[52px] w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-[1.5px] bg-white px-4 py-3 text-left text-lg ${
          value ? 'text-black' : 'text-form-placeholder'
        } ${error ? 'border-form-error' : open ? 'border-blue-secondary' : 'border-form-input'}`}
      >
        <span>{value || placeholder}</span>
        <span className={`flex-none transition-transform ${open ? 'rotate-180' : ''}`}>
          <Chevron />
        </span>
      </button>
      {open && (
        <div className='absolute left-0 right-0 top-full z-30 mt-1.5 flex flex-col gap-1.5 rounded-2xl border border-form-line bg-white p-2 shadow-[0_16px_40px_rgba(10,39,82,.14)]'>
          <span className='relative block'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              className='pointer-events-none absolute left-3.5 top-3.5'
              aria-hidden
            >
              <circle cx='11' cy='11' r='7' stroke='#4B5563' strokeWidth='2' />
              <path d='M20 20l-3.5-3.5' stroke='#4B5563' strokeWidth='2' strokeLinecap='round' />
            </svg>
            <input
              ref={searchRef}
              type='text'
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={onKey}
              placeholder={searchPlaceholder}
              className='h-12 w-full rounded-[10px] border-[1.5px] border-form-line pl-11 pr-3.5 text-[17px] outline-none focus:border-blue-secondary'
            />
          </span>
          <div role='listbox' className='flex max-h-80 flex-col overflow-y-auto'>
            {items.map(item => (
              <button
                key={item}
                type='button'
                role='option'
                aria-selected={item === value}
                onClick={() => pick(item)}
                className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-[17px] leading-[1.4] text-black hover:bg-form-soft ${
                  item === value ? 'bg-form-selected' : ''
                }`}
              >
                <span>{item}</span>
                {item === value && <CheckIcon size={18} stroke={2.5} />}
              </button>
            ))}
            {items.length === 0 && (
              <div className='px-3 py-3.5 text-base text-form-muted'>Нічого не знайдено</div>
            )}
          </div>
        </div>
      )}
      <FieldError>{error}</FieldError>
    </div>
  );
};
