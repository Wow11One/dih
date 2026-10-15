import PostHead from '@/components/posts/PostHead';
import PostView from '@/components/posts/PostView';
import { getPost } from '@/lib/posts';
import type { Post } from '@/payload-types';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';

export default function NewsPost({ post }: { post: Post }) {
  const t = useTranslations('News');

  return (
    <>
      <PostHead post={post} />
      <PostView post={post} section={{ title: t('title'), href: '/news' }} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const post = await getPost('news', String(params?.slug), locale);
  if (!post) return { notFound: true };

  return {
    props: {
      post,
      messages: (await import(`@/messages/${locale}.json`)).default,
      locale,
    },
  };
};
