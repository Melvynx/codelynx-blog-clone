import { YouTubeEmbed } from "@next/third-parties/google";

export const MdxYouTube = ({ id }: { id: string }) => {
  return <YouTubeEmbed videoid={id} />;
};
