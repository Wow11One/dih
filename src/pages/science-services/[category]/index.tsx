import PostList from '@/components/posts/PostList';
import { SCIENCE_CATEGORIES } from '@/constants/postCategories';
import { getPosts, type PostListItem } from '@/lib/posts';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface Props {
  title: string;
  posts: PostListItem[];
}

export default function ScienceCategory({ title, posts }: Props) {
  return (
    <>
      <Head>
        <title>{`DIH | ${title}`}</title>
      </Head>
      <PostList title={title} posts={posts} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  locale,
}) => {
  const category = SCIENCE_CATEGORIES.find(c => c.value === params?.category);
  if (!category) return { notFound: true };

  return {
    props: {
      title: category.label[locale === 'en' ? 'en' : 'uk'],
      posts: await getPosts(category.value, locale),
      messages: (await import(`@/messages/${locale}.json`)).default,
      locale,
    },
  };
};
