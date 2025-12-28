'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

function DotPatternDark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
        maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
        opacity: 0.6,
      }}
    />
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#1a522e]/20 bg-[#1a522e]/10 px-3 py-1 text-xs font-medium text-[#1a522e]">
      {children}
    </span>
  );
}

function ReadMoreButton() {
  return (
    <span className="inline-flex items-center justify-center rounded-md bg-[#1a522e] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#133f24] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1a522e]/40">
      ĐỌC THÊM
    </span>
  );
}

function PostCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
      scroll={false}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-6">
        <p className="text-xs font-medium tracking-wide text-gray-600">
          {post.date}
        </p>

        <h3 className="text-lg font-bold leading-snug text-gray-900 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm leading-relaxed text-gray-700 line-clamp-3">
          {post.excerpt}
        </p>

        <span className="mt-auto inline-flex text-sm font-semibold text-[#1a522e] hover:underline">
          ĐỌC THÊM →
        </span>
      </div>
    </Link>
  );
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: Promise<{ all?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const showAll = sp.all === "1";

  const visiblePosts = showAll ? posts : posts.slice(0, 6);

  return (
    <main className="bg-gray-50 text-gray-800">
      {/* HERO với Banner - Giống chuẩn các trang khác */}
      <section className="relative h-96 w-full">
        <Image
          src="/images/banner4.jpg"
          alt="Tin tức & Câu chuyện - Quỹ Từ Thiện Bông Hồng Nhỏ"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Tin tức & Câu chuyện</h1>
          <p className="text-lg">
            <Link href="/" className="hover:text-[#1a522e] transition-colors">
              Trang chủ
            </Link>{' '}
            / <span className="text-[#1a522e]">Tin tức</span>
          </p>
        </div>
      </section>

      {/* FEATURED CARD */}
      <section className="relative -mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="relative min-h-[240px] md:min-h-[360px] md:col-span-3">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-12 md:col-span-2">
                <p className="text-[11px] font-semibold tracking-[0.22em] text-gray-600">
                  {featured.tag ?? "BÀI VIẾT NỔI BẬT"}
                </p>

                <h2 className="mt-4 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl">
                  {featured.title}
                </h2>

                <p className="mt-4 text-base leading-relaxed text-gray-700">
                  {featured.excerpt}
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <Link href={`/tin-tuc/${featured.slug}`} scroll={false}>
                    <ReadMoreButton />
                  </Link>
                  <span className="text-sm text-gray-600">{featured.date}</span>
                </div>
              </div>
            </div>
          </article>

          {/* RECENT POSTS */}
          <div className="mt-16">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Bài viết mới</h3>
                <p className="mt-1 text-gray-600">
                  Cập nhật, câu chuyện và hoạt động thiện nguyện.
                </p>
              </div>

              {posts.length > 6 && (
                <Link
                  href={showAll ? "/tin-tuc" : "/tin-tuc?all=1"}
                  className="hidden text-sm font-semibold text-[#1a522e] hover:underline sm:inline-flex items-center gap-1"
                  scroll={false}
                >
                  {showAll ? "Thu gọn" : "Xem tất cả"} →
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>

            {posts.length > 6 && (
              <div className="mt-8 text-center sm:hidden">
                <Link
                  href={showAll ? "/tin-tuc" : "/tin-tuc?all=1"}
                  className="inline-flex text-sm font-semibold text-[#1a522e] hover:underline items-center gap-1"
                  scroll={false}
                >
                  {showAll ? "Thu gọn" : "Xem tất cả"} →
                </Link>
              </div>
            )}
          </div>

          <div className="h-20" />
        </div>
      </section>
    </main>
  );
}