import PostHead from '@/components/posts/PostHead';
import PostView from '@/components/posts/PostView';
import { SCIENCE_CATEGORIES } from '@/constants/postCategories';
import { getPost } from '@/lib/posts';
import type { Post } from '@/payload-types';
import { GetServerSideProps } from 'next';

interface Props {
  post: Post;
  section: { title: string; href: string };
}

export default function SciencePost({ post, section }: Props) {
  return (
    <>
      <PostHead post={post} />
      <PostView post={post} section={section} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  locale,
}) => {
  const category = SCIENCE_CATEGORIES.find(c => c.value === params?.category);
  if (!category) return { notFound: true };

  const post = await getPost(category.value, String(params?.slug), locale);
  if (!post) return { notFound: true };

  return {
    props: {
      post,
      section: {
        title: category.label[locale === 'en' ? 'en' : 'uk'],
        href: category.basePath,
      },
      messages: (await import(`@/messages/${locale}.json`)).default,
      locale,
    },
  };
};
