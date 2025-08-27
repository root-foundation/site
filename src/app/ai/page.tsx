import { fetchMarkdownFromGitHub, GITHUB_RAW_URLS } from "@/lib/markdown";
import EssayPage from "@/components/EssayPage";

export default async function AIPage() {
  const content = await fetchMarkdownFromGitHub(GITHUB_RAW_URLS.ai);

  return <EssayPage content={content} />;
}

const title = "RootNet: AI changes the shape of our economy";
const description = "How AI changes the shape of our economy.";
const url = "/ai-share.png";

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
