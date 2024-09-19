import { Post } from "@/lib/posts";
import { ImageResponse } from "next/og";
import { OgImage } from "./OgImage";
import { getUrl } from "./getUrl";

const URL = getUrl();

export const alt = "Codelynx posts image preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function TwitterImagePage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = (await fetch(`${URL}/api/posts/${params.slug}`).then((res) =>
    res.json()
  )) as Post;

  return new ImageResponse(<OgImage post={post} url={URL} />, {
    ...size,
  });
}
