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
                    <p className="mt-2 text-black/70">
                        Không tìm thấy bài theo slug: <b>{slug}</b>
                    </p>
                    <Link href="/news" className="mt-6 inline-block text-[#00BF4D] hover:underline">
                        ← Quay lại Tin tức
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-white text-black text-[15px] leading-7">
            <div className="w-full">
                <div className="mx-auto max-w-5xl px-4 pt-8 sm:pt-10">
                    <div className="overflow-hidden rounded-xl border border-black/10">
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

            {/* NỘI DUNG */}
            <div className="mx-auto max-w-3xl px-4 pb-12 pt-8 sm:pt-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-black/60">
                    <span>{post.date}</span>
                    <span className="h-1 w-1 rounded-full bg-black/30" />
                    <span>{post.author ?? "By admin"}</span>
                    <span className="h-1 w-1 rounded-full bg-black/30" />
                    <span>{post.category ?? "Tin tức"}</span>
                </div>

                <h1 className="mt-3 text-2xl font-extrabold leading-snug sm:text-4xl">
                    {post.title}
                </h1>

                {post.excerpt && (
                    <p className="mt-3 text-sm leading-relaxed text-black/70">
                        {post.excerpt}
                    </p>
                )}

                <article className="prose prose-zinc mt-8 max-w-none">
                    {(post.content ?? []).map((p, idx) => (
                        <p key={idx}>{p}</p>
                    ))}
                </article>

                {post.cover && (
                    <div className="mt-10 overflow-hidden rounded-xl border border-black/10">
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
