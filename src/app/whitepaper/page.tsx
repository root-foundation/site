import { fetchMarkdownFromGitHub, GITHUB_RAW_URLS } from "@/lib/markdown";
import EssayPage from "@/components/EssayPage";

export default async function WhitepaperPage() {
  const content = await fetchMarkdownFromGitHub(GITHUB_RAW_URLS.whitepaper);

  return <EssayPage content={content} />;
}

export const metadata = {
  title: "RootNet Whitepaper",
  description: "Prosperity through unity.",
  openGraph: {
    title: "RootNet Whitepaper",
    description: "Prosperity through unity.",
    images: [
      {
        url: "/public/whitepaper-share.png", // 1200x630 or 1200x675
        width: 1200,
        height: 630,
      },
    ],
  },
};
