import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react';
import { getPostPath } from '@/constants/postCategories';

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({
    internalDocToHref: ({ linkNode }) => {
      const doc = linkNode.fields.doc?.value;
      return typeof doc === 'object' && doc && 'category' in doc
        ? getPostPath(doc as unknown as { category: string; slug: string })
        : '#';
    },
  }),
});

export default function RichText({ data }: { data: unknown }) {
  if (!data) return null;
  return (
    <LexicalRichText
      className='rich-text'
      converters={converters}
      data={data as SerializedEditorState}
    />
  );
}
