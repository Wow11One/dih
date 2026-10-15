import Head from 'next/head';
import { isMedia } from '@/lib/media';
import type { Post } from '@/payload-types';
import { DEFAULT_COVER } from './PostView';

const absolute = (url: string) =>
  url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}${url}`;

// <title> plus Open Graph tags for link previews in messengers.
export default function PostHead({ post }: { post: Post }) {
  const cover = isMedia(post.cover) ? post.cover : null;
  const image = absolute(cover?.sizes?.card?.url || cover?.url || DEFAULT_COVER);

  return (
    <Head>
      <title>{`DIH | ${post.title}`}</title>
      <meta name='description' content={post.excerpt} />
      <meta property='og:type' content='article' />
      <meta property='og:title' content={post.title} />
      <meta property='og:description' content={post.excerpt} />
      <meta property='og:image' content={image} />
    </Head>
  );
}
