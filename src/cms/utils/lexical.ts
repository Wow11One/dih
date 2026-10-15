type LexicalNode = {
  type?: string;
  text?: string;
  children?: LexicalNode[];
};

type LexicalValue = { root?: LexicalNode } | null | undefined;

const hasContent = (node: LexicalNode): boolean => {
  if (node.type === 'text') return Boolean(node.text?.trim());
  // Uploads, horizontal rules etc. count as content.
  if (!node.children) return node.type !== 'linebreak';
  return node.children.some(hasContent);
};

// An editor that was opened and cleared still saves an empty root.
// Treating it as empty lets the locale fallback (en → uk) kick in.
export const isEmptyLexical = (value: LexicalValue): boolean =>
  !value?.root?.children?.some(hasContent);

const paragraph = (text: string) => ({
  type: 'paragraph',
  format: '' as const,
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  textFormat: 0,
  textStyle: '',
  children: [
    {
      type: 'text',
      text,
      format: 0,
      style: '',
      mode: 'normal',
      detail: 0,
      version: 1,
    },
  ],
});

// Builds editor state from plain text, one paragraph per blank-line block.
export const lexicalFromText = (text: string) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: text
      .split(/\n\s*\n/)
      .map(block => block.trim())
      .filter(Boolean)
      .map(paragraph),
  },
});
