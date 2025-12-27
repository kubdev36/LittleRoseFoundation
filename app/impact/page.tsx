import Image from "next/image";
import Link from "next/link";
import { Home, GraduationCap, Shirt, HeartPulse } from "lucide-react";
import impactData from "../data/impact.json";

type Metric = { label: string; value: string };

type ImpactPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag?: string;
  image: string;
  content?: string[];
};

type ImpactData = {
  hero: { image: string };
  intro: {
    kicker: string;
    title: string;
    paragraphs: string[];
    ctaText?: string;
    ctaHref?: string;
  };
  highlight: {
    image: string;
    title: string;
    body: string;
    ctaText: string;
    ctaHref: string;
  };
  stats: { title: string; items: { label: string; value: string }[] };
  posts: ImpactPost[];
};

const data = impactData as ImpactData;

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-extrabold tracking-wide text-gray-900">{children}</h2>;
}

const getStatIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("nhà")) return Home;
  if (l.includes("học")) return GraduationCap;
  if (l.includes("đồng phục")) return Shirt;
  if (l.includes("bệnh viện")) return HeartPulse;
  return Home;
};

function StatCard({ item }: { item: Metric }) {
  const Icon = getStatIcon(item.label);
  return (
    <div className="flex items-center gap-4 rounded-xl bg-[#1a522e]/5 p-5">
      <div className="h-12 w-12 shrink-0 rounded-full bg-[#1a522e]/10 flex items-center justify-center text-[#1a522e]">
        <Icon size={24} strokeWidth={2} />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gray-900">{item.value}</p>
        <p className="mt-1 text-sm text-gray-600">{item.label}</p>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return iso;
  return new Date(t).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function StoryCard({ post }: { post: ImpactPost }) {
  return (
    <Link
      href={`/tac-dong/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
      scroll={false}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-xs font-medium text-gray-600">
            {formatDate(post.date)}
          </p>
          {post.tag && (
            <span className="rounded-full bg-[#1a522e]/10 px-3 py-1 text-xs font-bold text-[#1a522e]">
              {post.tag}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold leading-tight text-gray-900 line-clamp-2">
          {post.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-gray-700 line-clamp-3">
          {post.excerpt}
        </p>

        <span className="mt-4 inline-flex text-sm font-bold text-[#1a522e] hover:underline">
          ĐỌC THÊM →
        </span>
      </div>
    </Link>
  );
}

export default function ImpactPage({ searchParams }: { searchParams?: { all?: string } }) {
  const showAll = searchParams?.all === "1";

  const postsSorted = [...(data.posts ?? [])].sort((a, b) => {
    const ta = Date.parse(a.date);
    const tb = Date.parse(b.date);
    if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;
    return tb - ta;
  });

  const visiblePosts = showAll ? postsSorted : postsSorted.slice(0, 6);
  const hasMore = postsSorted.length > 6;

  const heroSubtitle =
    data.intro.paragraphs?.[0] ??
    "Kết nối cộng đồng và đối tác để gây quỹ, hỗ trợ khẩn cấp và đồng hành dài hạn.";

  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1a522e] text-white">
        <DotPatternDark />

        <div
          aria-hidden
          className="pointer-events-none absolute right-6 top-14 hidden h-40 w-32 opacity-60 lg:block"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />

        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold tracking-widest text-white/80">
              {data.intro.kicker}
            </p>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {data.intro.title.split("Little Roses Foundation")[0]}
              <span className="text-white">Little Roses Foundation</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl md:grid-cols-2">
          <div className="relative min-h-[280px] md:min-h-[400px]">
            <Image
              src={data.highlight.image}
              alt={data.highlight.title}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
          </div>

          <div className="bg-[#1a522e] p-8 text-white sm:p-12">
            <p className="text-xs font-extrabold tracking-widest text-white/80">
              HIGHLIGHT
            </p>

            <h3 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
              {data.highlight.title}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-white/90">
              {data.highlight.body}
            </p>

            <Link
              href={data.highlight.ctaHref}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-bold text-[#1a522e] shadow-lg hover:bg-gray-100 transition"
              scroll={false}
            >
              {data.highlight.ctaText} →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTitle>{data.stats.title}</SectionTitle>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {data.stats.items.map((s, i) => (
            <StatCard key={i} item={s} />
          ))}
        </div>
      </section>

      {/* Stories Section */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-10">
          <SectionTitle>CÂU CHUYỆN TÁC ĐỘNG</SectionTitle>

          {hasMore && (
            <Link
              href={showAll ? "/tac-dong" : "/tac-dong?all=1"}
              className="text-sm font-bold text-[#1a522e] hover:underline flex items-center gap-1"
              scroll={false}
            >
              {showAll ? "Thu gọn" : "Xem tất cả"} →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((p) => (
            <StoryCard key={p.slug} post={p} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center sm:hidden">
            <Link
              href={showAll ? "/tac-dong" : "/tac-dong?all=1"}
              className="inline-flex text-sm font-bold text-[#1a522e] hover:underline items-center gap-1"
              scroll={false}
            >
              {showAll ? "Thu gọn" : "Xem tất cả"} →
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}