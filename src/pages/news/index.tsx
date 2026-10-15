import PostList from '@/components/posts/PostList';
import { getPosts, type PostListItem } from '@/lib/posts';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

export default function News({ posts }: { posts: PostListItem[] }) {
  const t = useTranslations('News');

  return (
    <>
      <Head>
        <title>{`DIH | ${t('title')}`}</title>
      </Head>
      <PostList title={t('title')} posts={posts} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      posts: await getPosts('news', locale),
      messages: (await import(`@/messages/${locale}.json`)).default,
      locale,
    },
  };
};
