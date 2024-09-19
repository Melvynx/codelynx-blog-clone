import { Mdx } from "@/features/mdx/Mdx";
import { getPost } from "@/lib/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewCount } from "./ViewCount";

export const dynamic = "force-static";

export const generateMetadata = async (props: {
  params: { slug: string };
}): Promise<Metadata> => {
  const post = await getPost(props.params.slug);

  if (!post) {
    return {
      title: "404 - Page Not Found",
      description: "Page not found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
};

export default async function RoutePage(props: { params: { slug: string } }) {
  const post = await getPost(props.params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="prose prose-sm lg:prose-lg">
      <div className="flex items-center gap-2">
        <p className="text-xs text-muted-foreground">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <ViewCount slug={props.params.slug} />
      </div>
      <h1>{post.title}</h1>
      <Mdx>{post.content}</Mdx>
    </div>
  );
}
