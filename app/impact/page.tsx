import Image from "next/image";
import Link from "next/link";
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
    return <h2 className="text-sm font-extrabold tracking-wide text-black">{children}</h2>;
}

function StatCard({ item }: { item: Metric }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border border-black/10 bg-black/[0.03]" />
            <div>
                <p className="text-xl font-extrabold leading-none">{item.value}</p>
                <p className="mt-1 text-xs text-black/60">{item.label}</p>
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
            href={`/impact/${post.slug}`}
            className="group block overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-semibold tracking-wide text-black/60">
                        {formatDate(post.date)}
                    </p>
                    {post.tag && (
                        <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-bold text-black/60">
                            {post.tag}
                        </span>
                    )}
                </div>

                <h3 className="mt-2 text-sm font-extrabold leading-snug text-black">
                    {post.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-black/70 line-clamp-3">
                    {post.excerpt}
                </p>

                <span className="mt-3 inline-flex text-xs font-bold text-[#00BF4D] hover:underline">
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
        <main className="bg-white text-black">
            <section className="relative overflow-hidden bg-[#1F2323] text-white">
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

                <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-[11px] font-extrabold tracking-[0.22em] text-[#00BF4D]">
                            {data.intro.kicker}
                        </p>

                        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                            {data.intro.title.split("Little Roses Foundation")[0]}
                            <span className="text-[#00BF4D]">Little Roses Foundation</span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                            {heroSubtitle}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm md:grid-cols-2">
                    <div className="relative min-h-[220px] md:min-h-[320px]">
                        <Image
                            src={data.highlight.image}
                            alt="Highlight"
                            fill
                            sizes="(max-width:768px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="bg-[#00BF4D] p-7 text-white sm:p-10">
                        <p className="text-[11px] font-extrabold tracking-widest text-white/90">
                            HIGHLIGHT
                        </p>

                        <h3 className="mt-3 text-xl font-extrabold leading-snug sm:text-2xl">
                            {data.highlight.title}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-white/90">
                            {data.highlight.body}
                        </p>

                        <Link
                            href={data.highlight.ctaHref}
                            className="mt-6 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-xs font-extrabold text-black shadow-sm hover:bg-white/90"
                        >
                            {data.highlight.ctaText} →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                <SectionTitle>{data.stats.title}</SectionTitle>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {data.stats.items.map((s, i) => (
                        <StatCard key={i} item={s} />
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
                <div className="flex items-end justify-between gap-4">
                    <SectionTitle>CÂU CHUYỆN TÁC ĐỘNG</SectionTitle>

                    {hasMore && (
                        <Link
                            href={showAll ? "/impact" : "/impact?all=1"}
                            className="text-sm font-bold text-[#00BF4D] hover:underline"
                        >
                            {showAll ? "Thu gọn →" : "Xem tất cả →"}
                        </Link>
                    )}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {visiblePosts.map((p) => (
                        <StoryCard key={p.slug} post={p} />
                    ))}
                </div>

                {hasMore && (
                    <div className="mt-6 sm:hidden">
                        <Link
                            href={showAll ? "/impact" : "/impact?all=1"}
                            className="inline-flex text-sm font-bold text-[#00BF4D] hover:underline"
                        >
                            {showAll ? "Thu gọn →" : "Xem tất cả →"}
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
}
