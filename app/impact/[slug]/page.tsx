import Image from "next/image";
import Link from "next/link";
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

export default async function ImpactDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const all = getAllImpactPosts();
  const post = all.find((p) => safe(p.slug) === safe(slug));

  if (!post) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-2xl font-bold text-gray-900">Không tìm thấy câu chuyện</h1>
          <p className="mt-2 text-gray-600">
            Bài viết này không tồn tại hoặc đã bị xoá.
          </p>
          <Link
            href="/tac-dong"
            className="mt-6 inline-block text-[#1a522e] hover:underline font-medium"
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
    <main className="bg-white text-gray-800 text-base leading-7">
      {/* Ảnh bìa chính - full width */}
      <div className="w-full">
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:pt-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
            <Image
              src={coverSrc}
              alt={post.title}
              width={1400}
              height={780}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Nội dung bài viết */}
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:pt-12">
        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-gray-400" />
          <span>{post.author ?? "LRF"}</span>
          <span className="h-1 w-1 rounded-full bg-gray-400" />
          <span className="font-semibold text-[#1a522e]">
            {post.category ?? post.tag ?? "Câu chuyện tác động"}
          </span>
        </div>

        {/* Tiêu đề */}
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Nội dung chính */}
        <article className="prose prose-lg max-w-none mt-12 text-gray-700">
          {post.content?.length ? (
            post.content.map((paragraph, idx) => (
              <p key={idx} className="mb-6 leading-8">{paragraph}</p>
            ))
          ) : (
            <p className="mb-6 leading-8">{post.excerpt}</p>
          )}
        </article>

        {/* Ảnh phụ nếu có cover riêng */}
        {post.cover && post.cover !== post.image && (
          <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
            <Image
              src={post.cover}
              alt={post.title}
              width={1200}
              height={700}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
      </div>
    </main>
  );
}