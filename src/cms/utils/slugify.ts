// Ukrainian → Latin, simplified national transliteration (KMU 2010).
// The second value is used at the start of a word.
const MAP: Record<string, [string, string?]> = {
  а: ['a'], б: ['b'], в: ['v'], г: ['h'], ґ: ['g'], д: ['d'], е: ['e'],
  є: ['ie', 'ye'], ж: ['zh'], з: ['z'], и: ['y'], і: ['i'], ї: ['i', 'yi'],
  й: ['i', 'y'], к: ['k'], л: ['l'], м: ['m'], н: ['n'], о: ['o'], п: ['p'],
  р: ['r'], с: ['s'], т: ['t'], у: ['u'], ф: ['f'], х: ['kh'], ц: ['ts'],
  ч: ['ch'], ш: ['sh'], щ: ['shch'], ь: [''], ю: ['iu', 'yu'], я: ['ia', 'ya'],
  ё: ['e'], ы: ['y'], э: ['e'], ъ: [''],
};

const APOSTROPHES = /['’ʼ`]/g;

export const slugify = (value: string): string => {
  const lower = value.toLowerCase().replace(APOSTROPHES, '');
  let result = '';

  for (let i = 0; i < lower.length; i++) {
    const char = lower[i];
    const entry = MAP[char];
    if (!entry) {
      result += char;
      continue;
    }
    const atWordStart = i === 0 || !/[a-zа-яіїєґ0-9]/.test(lower[i - 1]);
    result += atWordStart && entry[1] !== undefined ? entry[1] : entry[0];
  }

  return result
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '');
};
