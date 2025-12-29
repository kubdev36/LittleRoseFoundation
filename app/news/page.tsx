'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Thêm hook này
import newsData from "../data/news.json";

type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag?: string;
  image: string;
  cover?: string;
  author?: string;
  category?: string;
  content?: string[];
};

type NewsData = {
  featured?: NewsPost;
  posts?: NewsPost[];
};

const data = newsData as NewsData;
const featured = data.featured as NewsPost;
const posts = (data.posts ?? []) as NewsPost[];

function ReadMoreButton() {
  return (
    <span className="inline-flex items-center justify-center rounded-md bg-[#1a522e] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#134429] hover:shadow-md">
      ĐỌC THÊM
    </span>
  );
}

function PostCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl"
      scroll={false}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-5 sm:p-6">
        <p className="text-xs font-medium tracking-wide text-gray-600">
          {post.date}
        </p>

        <h3 className="text-lg sm:text-xl font-bold leading-snug text-gray-900 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm leading-relaxed text-gray-700 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <span className="mt-auto inline-flex text-sm font-semibold text-[#1a522e] hover:underline">
          ĐỌC THÊM →
        </span>
      </div>
    </Link>
  );
}

export default function NewsPage() {
  const searchParams = useSearchParams();
  const showAll = searchParams.get('all') === '1';

  const visiblePosts = showAll ? posts : posts.slice(0, 6);

  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        <Image
          src="/images/banner4.jpg"
          alt="Tin tức & Câu chuyện - Quỹ Từ Thiện Bông Hồng Nhỏ"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
            Tin tức & Câu chuyện
          </h1>
          <p className="text-base sm:text-lg drop-shadow-md">
            <Link href="/" className="hover:text-emerald-300 transition-colors">
              Trang chủ
            </Link>{' '}
            / <span className="text-emerald-300">Tin tức</span>
          </p>
        </div>
      </section>

      {/* Featured + Recent Posts */}
      <section className="relative -mt-12 md:-mt-16 lg:-mt-20 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Featured Article */}
          <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl mb-16 lg:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Image */}
              <div className="relative min-h-64 sm:min-h-80 lg:min-h-96 lg:col-span-3">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12 lg:col-span-2">
                <p className="text-xs font-bold tracking-widest text-gray-600 uppercase">
                  {featured.tag ?? "BÀI VIẾT NỔI BẬT"}
                </p>

                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-gray-900">
                  {featured.title}
                </h2>

                <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
                  {featured.excerpt}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link href={`/tin-tuc/${featured.slug}`} scroll={false}>
                    <ReadMoreButton />
                  </Link>
                  <span className="text-sm text-gray-600">{featured.date}</span>
                </div>
              </div>
            </div>
          </article>

          {/* Recent Posts Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 lg:mb-12">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Bài viết mới</h3>
                <p className="mt-2 text-base text-gray-600">
                  Cập nhật, câu chuyện và hoạt động thiện nguyện.
                </p>
              </div>

              {posts.length > 6 && (
                <Link
                  href={showAll ? "/tin-tuc" : "/tin-tuc?all=1"}
                  className="text-sm sm:text-base font-semibold text-[#1a522e] hover:underline inline-flex items-center gap-1"
                  scroll={false}
                >
                  {showAll ? "Thu gọn" : "Xem tất cả"} →
                </Link>
              )}
            </div>

            {/* Grid Posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visiblePosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>

            {/* Mobile "Xem tất cả" button */}
            {posts.length > 6 && (
              <div className="mt-10 text-center sm:hidden">
                <Link
                  href={showAll ? "/tin-tuc" : "/tin-tuc?all=1"}
                  className="inline-flex text-base font-semibold text-[#1a522e] hover:underline items-center gap-1"
                  scroll={false}
                >
                  {showAll ? "Thu gọn" : "Xem tất cả bài viết"} →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}