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
            <main className="bg-white text-black">
                <div className="mx-auto max-w-3xl px-4 py-12">
                    <h1 className="text-2xl font-extrabold">Không tìm thấy câu chuyện</h1>
                    <p className="mt-2 text-black/70">
                        Bài viết này không tồn tại hoặc đã bị xoá.
                    </p>
                    <Link
                        href="/impact"
                        className="mt-6 inline-block text-[#00BF4D] hover:underline"
                    >
                        ← Quay lại trang Tác động
                    </Link>
                </div>
            </main>
        );
    }

    const coverSrc = post.cover ?? post.image;

    return (
        <main className="bg-white text-black text-[15px] leading-7">
            {/* ẢNH 1 (lên đầu, full width như News) */}
            <div className="w-full">
                <div className="mx-auto max-w-5xl px-4 pt-8 sm:pt-10">
                    <div className="overflow-hidden rounded-xl border border-black/10">
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

            {/* NỘI DUNG */}
            <div className="mx-auto max-w-3xl px-4 pb-12 pt-8 sm:pt-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-black/60">
                    <span>{post.date}</span>
                    <span className="h-1 w-1 rounded-full bg-black/30" />
                    <span>{post.author ?? "By LRF"}</span>
                    <span className="h-1 w-1 rounded-full bg-black/30" />
                    <span>{post.category ?? post.tag ?? "Câu chuyện tác động"}</span>
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
                    {post.content?.length ? (
                        post.content.map((p, idx) => <p key={idx}>{p}</p>)
                    ) : (
                        <p>{post.excerpt}</p>
                    )}
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
