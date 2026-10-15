import NewsDateIcon from '@/components/icons/NewsDate';
import { formatDate, getYoutubeId } from '@/lib/format';
import { contentHasUpload, isMedia } from '@/lib/media';
import type { Post } from '@/payload-types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import RichText from './RichText';

export const DEFAULT_COVER = '/news/default-cover.webp';

interface PostViewProps {
  post: Post;
  section: { title: string; href: string };
}

export default function PostView({ post, section }: PostViewProps) {
  const t = useTranslations('Posts');
  const cover = isMedia(post.cover) ? post.cover : null;
  const youtubeId = getYoutubeId(post.youtubeUrl);
  const attachments = (post.attachments ?? []).filter(isMedia);
  const showCover = !cover || !contentHasUpload(post.content, cover.id);

  return (
    <main className='w-full flex flex-col flex-1'>
      <section className='w-full lg:pt-28 pt-14 pb-16 flex-1'>
        <div className='h-full flex flex-col flex-1 items-start px-5 lg:px-14'>
          <div className='text-lg lg:text-xl italic'>
            <Link href={section.href} className='hover:underline'>
              {section.title}
            </Link>{' '}
            {'>'} {post.title}
          </div>

          <article className='mt-4 lg:mt-8 space-y-6 w-full max-w-5xl'>
            <div className='space-y-2'>
              <h1 className='text-xl lg:text-2xl font-bold'>{post.title}</h1>
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

            <div className='text-lg lg:text-xl'>
              <RichText data={post.content} />
            </div>

            {youtubeId && (
              <div className='aspect-video w-full overflow-hidden rounded-md'>
                <iframe
                  className='h-full w-full'
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                  title={post.title}
                  allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            )}

            {showCover && (
              <img
                src={cover?.sizes?.large?.url || cover?.url || DEFAULT_COVER}
                alt={cover?.alt || post.title}
                className='w-full h-auto rounded-md'
              />
            )}

            {attachments.length > 0 && (
              <div className='space-y-2 text-lg lg:text-xl'>
                <h2 className='font-bold'>{t('attachments')}</h2>
                <ul className='space-y-1'>
                  {attachments.map(file => (
                    <li key={file.id}>
                      <a
                        href={file.url ?? '#'}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-2 hover:opacity-80'
                      >
                        {file.alt || file.filename}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
