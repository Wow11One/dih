import type { Media } from '@/payload-types';

// Upload fields are either a populated doc or just an id (depth 0).
export const isMedia = (value: unknown): value is Media =>
  typeof value === 'object' && value !== null && 'url' in value;

type LexicalNode = { type?: string; value?: unknown; children?: LexicalNode[] };

// True if the rich text already contains this upload (e.g. the cover image
// was also inserted into the text), so it isn't rendered twice.
export const contentHasUpload = (content: unknown, id: number | string) => {
  const visit = (node: LexicalNode): boolean => {
    if (node.type === 'upload') {
      const value = node.value;
      const uploadId = isMedia(value) ? value.id : value;
      if (uploadId === id) return true;
    }
    return node.children?.some(visit) ?? false;
  };
  const root = (content as { root?: LexicalNode } | null)?.root;
  return root ? visit(root) : false;
};
