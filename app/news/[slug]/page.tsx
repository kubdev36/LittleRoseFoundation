import Image from "next/image";
import Link from "next/link";
import newsData from "../../data/news.json";

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

const safe = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function getAllNewsPosts(): NewsPost[] {
  const data = newsData as NewsData;
  const list: NewsPost[] = [];

  if (data.featured && safe(data.featured.slug)) list.push(data.featured);
  if (Array.isArray(data.posts)) {
    for (const p of data.posts) {
      if (p && safe(p.slug)) list.push(p);
    }
  }

  const map = new Map<string, NewsPost>();
  list.forEach((p) => map.set(safe(p.slug), p));
  return Array.from(map.values());
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const all = getAllNewsPosts();
  const post = all.find((p) => safe(p.slug) === safe(slug));

  if (!post) {
    return (
      <main className="bg-white text-black">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-2xl font-bold">Không tìm thấy tin tức</h1>
          <p className="mt-2 text-gray-600">
            Không tìm thấy bài theo slug: <b>{slug}</b>
          </p>
          <Link href="/tin-tuc" className="mt-6 inline-block text-[#1a522e] hover:underline font-medium" scroll={false}>
            ← Quay lại Tin tức
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white text-gray-800 text-base leading-7">
      {/* Ảnh bìa chính */}
      <div className="w-full">
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:pt-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
            <Image
              src={post.cover ?? post.image}
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
          <span>{post.author ?? "Quản trị viên"}</span>
          {post.category && (
            <>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span className="font-semibold text-[#1a522e]">{post.category}</span>
            </>
          )}
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
          {(post.content ?? []).map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-8">{paragraph}</p>
          ))}
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