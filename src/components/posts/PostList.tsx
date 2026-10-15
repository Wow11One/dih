import NewsDateIcon from '@/components/icons/NewsDate';
import { getPostPath } from '@/constants/postCategories';
import { formatDate } from '@/lib/format';
import type { PostListItem } from '@/lib/posts';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface PostListProps {
  title: string;
  posts: PostListItem[];
}

export default function PostList({ title, posts }: PostListProps) {
  const t = useTranslations('Posts');

  return (
    <main className='w-full flex flex-col flex-1'>
      <section className='w-full lg:pt-28 pt-14 pb-16 flex-1'>
        <div className='h-full flex flex-col flex-1 items-start px-5 lg:px-14'>
          <h1 className='text-xl lg:text-2xl font-bold'>{title}</h1>

          {posts.length === 0 ? (
            <p className='mt-8 lg:mt-14 text-lg lg:text-xl'>{t('empty')}</p>
          ) : (
            <div className='mt-8 lg:mt-14 space-y-8 lg:space-y-16'>
              {posts.map(post => (
                <article key={post.id} className='flex flex-col gap-4 lg:gap-6'>
                  <div className='space-y-2'>
                    <Link
                      className='text-xl lg:text-2xl font-bold underline underline-offset-2'
                      href={getPostPath(post)}
                    >
                      {post.title}
                    </Link>
                    <div className='flex gap-1.5 items-center'>
                      <div style={{ paddingTop: 3 }}>
                        <NewsDateIcon />
                      </div>
                      <time
                        className='text-lg lg:text-xl'
                        dateTime={post.publishedAt ?? undefined}
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                  </div>

                  <p className='text-lg lg:text-xl'>{post.excerpt}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
