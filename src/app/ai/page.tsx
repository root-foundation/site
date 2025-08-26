import { fetchMarkdownFromGitHub, GITHUB_RAW_URLS } from "@/lib/markdown";
import EssayPage from "@/components/EssayPage";

export default async function AIPage() {
  const content = await fetchMarkdownFromGitHub(GITHUB_RAW_URLS.ai);

  return <EssayPage content={content} />;
}

const title = "RootNet: AI changes the shape of our economy";
const description = "How AI changes the shape of our economy.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: "/public/ai-share.png", // 1200x630 or 1200x675
        width: 1200,
        height: 630,
      },
    ],
  },
};
