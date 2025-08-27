import { fetchMarkdownFromGitHub, GITHUB_RAW_URLS } from "@/lib/markdown";
import EssayPage from "@/components/EssayPage";

export default async function WhitepaperPage() {
  const content = await fetchMarkdownFromGitHub(GITHUB_RAW_URLS.whitepaper);

  return <EssayPage content={content} />;
}

const title = "RootNet Whitepaper";
const description = "Prosperity through unity.";
const url = "/whitepaper-share.png";

export const metadata = {
  metadataBase: new URL("https://rootnet.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url, // 1200x630 or 1200x675
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [url],
  },
};
