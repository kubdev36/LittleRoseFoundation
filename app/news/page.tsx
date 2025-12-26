import Image from "next/image";
import Link from "next/link";
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
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  );
}

function ReadMoreButton() {
  return (
    <span className="inline-flex items-center justify-center rounded-md bg-[#00BF4D] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#00A640] focus:outline-none focus:ring-2 focus:ring-[#00BF4D]/40">
      ĐỌC THÊM
    </span>
  );
}

function PostCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-5">
        <p className="text-xs font-medium tracking-wide text-black/60">
          {post.date}
        </p>

        <h3 className="text-base font-semibold leading-snug text-black">
          {post.title}
        </h3>

        <p className="text-sm leading-relaxed text-black/70 line-clamp-3">
          {post.excerpt}
        </p>

        <span className="mt-auto inline-flex text-xs font-semibold text-[#00BF4D] hover:underline">
          ĐỌC THÊM
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
    <main className="bg-white text-black text-[15px] leading-7">
      {/* HERO (dark) */}
      <section className="relative overflow-hidden bg-[#1F2323] text-white">
        <DotPatternDark />

        {/* decor dots (giống hình) */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-6 top-14 hidden h-40 w-32 opacity-60 lg:block"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />

        <div className="mx-auto max-w-6xl px-4 pb-40 pt-16 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-extrabold tracking-[0.22em] text-[#00BF4D]">
              TIN TỨC & CÂU CHUYỆN
            </p>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Những câu chuyện tạo{" "}
              <span className="text-[#00BF4D]">tác động</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              Tin tức, câu chuyện đời thực và báo cáo tác động minh bạch.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Pill>Tin tức</Pill>
              <Pill>Cập nhật</Pill>
              <Pill>Cộng đồng</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CARD (overlap giống hình) */}
      <section className="relative -mt-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-transparent" />
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10 md:col-span-2">
                <p className="text-[11px] font-semibold tracking-[0.22em] text-black/55">
                  {featured.tag ?? "BÀI VIẾT NỔI BẬT"}
                </p>

                <h2 className="mt-3 text-xl font-extrabold leading-snug sm:text-2xl">
                  {featured.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-black/70">
                  {featured.excerpt}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <Link href={`/news/${featured.slug}`}>
                    <ReadMoreButton />
                  </Link>
                  <span className="text-xs text-black/60">{featured.date}</span>
                </div>
              </div>
            </div>
          </article>

          {/* RECENT */}
          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">Bài viết mới</h3>
                <p className="mt-1 text-sm text-black/70">
                  Cập nhật, câu chuyện và hoạt động thiện nguyện.
                </p>
              </div>

              {posts.length > 6 && (
                <Link
                  href={showAll ? "/news" : "/news?all=1"}
                  className="hidden text-sm font-semibold text-[#00BF4D] hover:underline sm:inline"
                >
                  {showAll ? "Thu gọn" : "Xem tất cả"}
                </Link>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>

            {posts.length > 6 && (
              <div className="mt-6 sm:hidden">
                <Link
                  href={showAll ? "/news" : "/news?all=1"}
                  className="inline-flex text-sm font-semibold text-[#00BF4D] hover:underline"
                >
                  {showAll ? "Thu gọn" : "Xem tất cả"}
                </Link>
              </div>
            )}
          </div>

          <div className="h-16" />
        </div>
      </section>
    </main>
  );
}
