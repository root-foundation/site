import { fetchMarkdownFromGitHub, GITHUB_RAW_URLS } from "@/lib/markdown";
import EssayPage from "@/components/EssayPage";

export default async function AIPage() {
  const content = await fetchMarkdownFromGitHub(GITHUB_RAW_URLS.ai);

  return <EssayPage title="" content={content} />;
}

export const metadata = {
  title: "RootNet: AI changes the shape of our economy",
  description: "How AI changes the shape of our economy.",
};
