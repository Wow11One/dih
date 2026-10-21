import type { ExportBeforeHook } from '@payloadcms/plugin-import-export/types';
import {
  INDUSTRIES,
  NO_OTHER_INDUSTRY,
  OTHER_INDUSTRY,
  QUESTIONS,
  SIZES,
  TRI,
} from '@/constants/digitalMaturity';

type Doc = Record<string, unknown>;

const label = (labels: readonly string[], value: unknown) =>
  labels[Number(value) - 1] ?? (value == null ? '' : String(value));

const labelList = (labels: readonly string[], value: unknown) =>
  (Array.isArray(value) ? value : []).map(v => label(labels, v)).join('; ');

const otherIndustry = (value: string) => {
  if (value === OTHER_INDUSTRY) return 'Інша галузь діяльності';
  if (value === NO_OTHER_INDUSTRY) return 'Жодна інша галузь діяльності';
  return label(INDUSTRIES, value);
};

// The server runs in UTC; the team reads dates in Kyiv time.
const DATE_FORMAT = new Intl.DateTimeFormat('uk-UA', {
  timeZone: 'Europe/Kyiv',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const formatDate = (iso: unknown) =>
  typeof iso === 'string' ? DATE_FORMAT.format(new Date(iso)).replace(',', '') : '';

// One row per assessment with Ukrainian column names and human-readable
// answers: labels instead of codes, multi-choice joined with "; ", and a
// separate column for every 0–5 / Ні-Частково-Так row so Excel can filter.
export const toCsvRow = (doc: Doc): Record<string, unknown> => {
  const row: Record<string, unknown> = {
    'Дата': formatDate(doc.createdAt),
    'ІНУ': doc.participantId ?? '',
    'Назва підприємства': doc.companyName ?? '',
    'Податковий номер': doc.taxId ?? '',
    'Контактна особа': doc.contactPerson ?? '',
    'Посада': doc.position ?? '',
    'Ел. пошта': doc.email ?? '',
    'Телефон': doc.phone ?? '',
    'Вебсайт': doc.website ?? '',
    'Чисельність персоналу': label(SIZES, doc.staffSize),
    'Рік заснування': doc.foundedYear ?? '',
    'Країна': doc.country ?? '',
    'Регіон': doc.region ?? '',
    'Поштовий індекс': doc.postalCode ?? '',
    'Повна адреса': doc.address ?? '',
    'Основна галузь': label(INDUSTRIES, doc.mainIndustry),
    'Інші галузі': (Array.isArray(doc.otherIndustries) ? doc.otherIndustries : [])
      .map(otherIndustry)
      .join('; '),
    'Інша галузь (вказана)': doc.otherIndustryText ?? '',
  };

  for (const q of QUESTIONS) {
    if (q.type === 'invest') {
      row[`${q.num}. Уже інвестувало`] = labelList(q.options, doc.q1Invested);
      row[`${q.num}. Планує інвестувати`] = labelList(q.options, doc.q1Planned);
    } else if (q.type === 'check') {
      row[`${q.num}. ${q.title}`] = labelList(q.options, doc[q.id]);
    } else {
      const values = (doc[q.id] ?? {}) as Record<string, unknown>;
      q.options.forEach((option, i) => {
        const value = values[`r${i + 1}`];
        row[`${q.num}.${i + 1} ${option}`] =
          q.type === 'tri'
            ? (TRI.find(t => t.value === value)?.label ?? '')
            : (value ?? '');
      });
    }
  }

  row['Згода на обробку даних'] = doc.consent ? 'Так' : 'Ні';
  row['Нотатка'] = doc.note ?? '';
  return row;
};

export const assessmentsBeforeExport: ExportBeforeHook = ({ format, data, originalData }) =>
  format === 'csv' ? (originalData as Doc[]).map(toCsvRow) : data;
