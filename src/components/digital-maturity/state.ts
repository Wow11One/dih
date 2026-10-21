import {
  INDUSTRIES,
  MAX_OTHER_INDUSTRIES,
  NO_OTHER_INDUSTRY,
  OTHER_INDUSTRY,
  QUESTIONS,
  SIZES,
  TRI,
  UKRAINE,
} from '@/constants/digitalMaturity';
import type { InvestValues, RowValues } from './questions';

export const DRAFT_KEY = 'dih-digital-maturity-draft-v1';
export const OTHER_COUNTRY = 'Інша';

// Client-side answers. Choices are kept as labels / 0-based indices (as in
// the design) and converted to the stored codes in toPayload().
export interface Answers {
  name: string;
  taxId: string;
  contact: string;
  position: string;
  email: string;
  phone: string;
  website: string;
  year: string;
  size: string;
  countryMode: string;
  country: string;
  region: string;
  regionText: string;
  zip: string;
  address: string;
  industry: string;
  other: string[];
  otherText: string;
  consent: boolean;
  hp: string;
  q1: InvestValues;
  q2: number[];
  q3: number[];
  q4: RowValues;
  q5: number[];
  q6: number[];
  q7: number[];
  q8: number[];
  q9: RowValues;
  q10: number[];
  q11: RowValues;
}

export type FieldKey = keyof Answers;

export const emptyAnswers = (): Answers => ({
  name: '',
  taxId: '',
  contact: '',
  position: '',
  email: '',
  phone: '',
  website: '',
  year: '',
  size: '',
  countryMode: UKRAINE,
  country: '',
  region: '',
  regionText: '',
  zip: '',
  address: '',
  industry: '',
  other: [],
  otherText: '',
  consent: false,
  hp: '',
  q1: {},
  q2: [],
  q3: [],
  q4: {},
  q5: [],
  q6: [],
  q7: [],
  q8: [],
  q9: {},
  q10: [],
  q11: {},
});

// Fields validated on each step (in on-screen order, for "scroll to first").
export const STEP_FIELDS: Record<number, FieldKey[]> = {
  1: [
    'name',
    'taxId',
    'contact',
    'position',
    'email',
    'phone',
    'website',
    'year',
    'size',
    'country',
    'regionText',
    'region',
    'zip',
    'address',
    'industry',
    'otherText',
  ],
  2: [],
  3: ['q4'],
  4: [],
  5: [],
  6: ['q9'],
  7: ['q11', 'consent'],
};

const required = (v: string, message: string) => (v.trim() ? '' : message);
const isUkraine = (a: Answers) => a.countryMode !== OTHER_COUNTRY;
const allRows = (id: 'q4' | 'q9' | 'q11', a: Answers) =>
  QUESTIONS.find(q => q.id === id)!.options.every((_, i) => a[id][i] != null);

export const validate = (key: FieldKey, a: Answers): string => {
  switch (key) {
    case 'name':
      return required(a.name, 'Вкажіть назву підприємства');
    case 'taxId': {
      const v = a.taxId.replace(/\s/g, '');
      if (!v) return 'Вкажіть податковий номер';
      return /^\d{8,12}$/.test(v) ? '' : 'Лише цифри, від 8 до 12 символів';
    }
    case 'contact':
      return required(a.contact, 'Вкажіть контактну особу');
    case 'position':
      return required(a.position, 'Вкажіть посаду');
    case 'email': {
      const v = a.email.trim();
      if (!v) return 'Вкажіть адресу ел. пошти';
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Невірний формат ел. пошти';
    }
    case 'phone': {
      const v = a.phone.replace(/[\s()-]/g, '');
      if (!v) return 'Вкажіть телефон';
      return /^\+\d{10,15}$/.test(v) ? '' : 'Невірний формат телефону';
    }
    case 'website': {
      const v = a.website.trim();
      if (!v) return '';
      return /^(https?:\/\/)?([\wЀ-ӿ-]+\.)+[a-zЀ-ӿ]{2,}(\/\S*)?$/i.test(v)
        ? ''
        : 'Невірний формат адреси сайту';
    }
    case 'size':
      return a.size ? '' : 'Оберіть чисельність персоналу';
    case 'year': {
      const current = new Date().getFullYear();
      const v = a.year.trim();
      if (!v) return 'Вкажіть рік заснування';
      const y = Number(v);
      return /^\d{4}$/.test(v) && y >= 1900 && y <= current
        ? ''
        : `Рік має бути від 1900 до ${current}`;
    }
    case 'country':
      return isUkraine(a) ? '' : required(a.country, 'Вкажіть країну');
    case 'regionText':
      return isUkraine(a) ? '' : required(a.regionText, 'Вкажіть регіон');
    case 'region':
      return !isUkraine(a) || a.region ? '' : 'Оберіть регіон';
    case 'zip': {
      const v = a.zip.trim();
      if (!v) return 'Вкажіть поштовий індекс';
      return !isUkraine(a) || /^\d{5}$/.test(v) ? '' : 'Індекс має містити 5 цифр';
    }
    case 'address':
      return required(a.address, 'Вкажіть повну адресу');
    case 'industry':
      return a.industry ? '' : 'Оберіть основну галузь';
    case 'otherText':
      return a.other.includes(OTHER_INDUSTRY) && !a.otherText.trim() ? 'Вкажіть галузь' : '';
    case 'q4':
    case 'q9':
      return allRows(key, a) ? '' : 'Оцініть кожну технологію';
    case 'q11':
      return allRows(key, a) ? '' : 'Оцініть кожне твердження';
    case 'consent':
      return a.consent ? '' : 'Потрібна ваша згода на обробку даних';
    default:
      return '';
  }
};

export const stepErrors = (step: number, a: Answers) =>
  (STEP_FIELDS[step] ?? []).filter(key => validate(key, a));

export const toggleOther = (current: string[], value: string) => {
  if (current.includes(value)) return current.filter(v => v !== value);
  if (value === NO_OTHER_INDUSTRY) return [NO_OTHER_INDUSTRY];
  if (current.includes(NO_OTHER_INDUSTRY) || current.length >= MAX_OTHER_INDUSTRIES) {
    return current;
  }
  return [...current, value];
};

export const toggleIndex = (current: number[], index: number, exclusive?: number) => {
  if (current.includes(index)) return current.filter(i => i !== index);
  if (index === exclusive) return [index];
  if (exclusive != null && current.includes(exclusive)) return current;
  return [...current, index];
};

const code = (labels: readonly string[], label: string) => String(labels.indexOf(label) + 1);
const codes = (indices: number[]) => [...indices].sort((x, y) => x - y).map(i => String(i + 1));
const rows = (values: RowValues, map: (v: number) => string | number = v => v) =>
  Object.fromEntries(Object.entries(values).map(([i, v]) => [`r${Number(i) + 1}`, map(v)]));

// Shape expected by the `assessments` collection.
export const toPayload = (a: Answers) => {
  const ukraine = isUkraine(a);
  const investRows = (key: 'd' | 'p') =>
    Object.entries(a.q1)
      .filter(([, v]) => v[key])
      .map(([i]) => Number(i));

  return {
    hp: a.hp,
    companyName: a.name.trim(),
    taxId: a.taxId.replace(/\s/g, ''),
    contactPerson: a.contact.trim(),
    position: a.position.trim(),
    email: a.email.trim(),
    phone: a.phone.replace(/[\s()-]/g, ''),
    website: a.website.trim(),
    staffSize: code(SIZES, a.size),
    foundedYear: Number(a.year),
    country: ukraine ? UKRAINE : a.country.trim(),
    region: ukraine ? a.region : a.regionText.trim(),
    postalCode: a.zip.trim(),
    address: a.address.trim(),
    mainIndustry: code(INDUSTRIES, a.industry),
    otherIndustries: a.other.map(v =>
      v === OTHER_INDUSTRY || v === NO_OTHER_INDUSTRY ? v : code(INDUSTRIES, v),
    ),
    otherIndustryText: a.other.includes(OTHER_INDUSTRY) ? a.otherText.trim() : '',
    q1Invested: codes(investRows('d')),
    q1Planned: codes(investRows('p')),
    q2: codes(a.q2),
    q3: codes(a.q3),
    q4: rows(a.q4),
    q5: codes(a.q5),
    q6: codes(a.q6),
    q7: codes(a.q7),
    q8: codes(a.q8),
    q9: rows(a.q9),
    q10: codes(a.q10),
    q11: rows(a.q11, v => TRI[v].value),
    consent: a.consent,
  };
};
