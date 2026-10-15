// dd.MM.yy, as in the original design.
export const formatDate = (iso?: string | null) => {
  if (!iso) return '';
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`;
};

// Returns the 11-char video id for youtube.com / youtu.be links.
export const getYoutubeId = (url?: string | null) =>
  url?.match(/(?:v=|embed\/|shorts\/|live\/|youtu\.be\/)([\w-]{11})/)?.[1] ?? null;
