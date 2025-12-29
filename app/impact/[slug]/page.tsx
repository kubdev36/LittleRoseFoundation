'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // Thay thế async params
import impactData from "../../data/impact.json";

type ImpactPost = {
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

type ImpactData = { posts?: ImpactPost[] };

const safe = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function getAllImpactPosts(): ImpactPost[] {
  const data = impactData as ImpactData;
  const list = (data.posts ?? []).filter(Boolean);
  const map = new Map<string, ImpactPost>();
  list.forEach((p) => map.set(safe(p.slug), p));
  return Array.from(map.values());
}

export default function ImpactDetailPage() {
  const { slug } = useParams() as { slug: string }; // Lấy slug từ URL

  const all = getAllImpactPosts();
  const post = all.find((p) => safe(p.slug) === safe(slug));

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Không tìm thấy câu chuyện
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Bài viết này không tồn tại hoặc đã bị xoá.
          </p>
          <Link
            href="/tac-dong"
            className="inline-flex items-center gap-2 text-[#1a522e] hover:underline font-semibold text-lg"
            scroll={false}
          >
            ← Quay lại trang Tác động
          </Link>
        </div>
      </main>
    );
  }

  const coverSrc = post.cover ?? post.image;

  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Ảnh bìa chính - Responsive full width */}
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:pt-12 lg:pt-16">
          <div className="overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl border border-gray-200">
            <Image
              src={coverSrc}
              alt={post.title}
              width={1400}
              height={780}
              sizes="100vw"
              className="w-full h-auto object-cover aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Nội dung bài viết */}
      <article className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:pt-12 lg:pt-16">
        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">
          <time dateTime={post.date}>{post.date}</time>
          <span className="h-1 w-1 rounded-full bg-gray-400" />
          <span>{post.author ?? "LRF Team"}</span>
          {post.category && (
            <>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span className="font-semibold text-[#1a522e]">
                {post.category}
              </span>
            </>
          )}
        </div>

        {/* Tiêu đề */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mt-4 mb-8">
          {post.title}
        </h1>

        {/* Excerpt (Lead paragraph) */}
        {post.excerpt && (
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-12 italic border-l-4 border-[#1a522e] pl-6">
            {post.excerpt}
          </p>
        )}

        {/* Nội dung chính */}
        <div className="prose prose-lg max-w-none text-gray-700 lg:prose-xl">
          {post.content?.length ? (
            post.content.map((paragraph, idx) => (
              <p key={idx} className="mb-8 leading-8">
                {paragraph}
              </p>
            ))
          ) : post.excerpt ? (
            <p className="mb-8 leading-8">{post.excerpt}</p>
          ) : null}
        </div>

        {/* Ảnh phụ nếu có cover riêng */}
        {post.cover && post.cover !== post.image && (
          <div className="mt-16 overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl border border-gray-200">
            <Image
              src={post.cover}
              alt={`Hình ảnh bổ sung: ${post.title}`}
              width={1200}
              height={700}
              sizes="100vw"
              className="w-full h-auto object-cover aspect-[16/9]"
            />
          </div>
        )}

        {/* Back link */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <Link
            href="/tac-dong"
            className="inline-flex items-center gap-3 text-[#1a522e] hover:underline font-semibold text-lg"
            scroll={false}
          >
            ← Quay lại danh sách câu chuyện tác động
          </Link>
        </div>
      </article>
    </main>
  );
}