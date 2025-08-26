import { fetchMarkdownFromGitHub, GITHUB_RAW_URLS } from "@/lib/markdown";
import EssayPage from "@/components/EssayPage";

export default async function AIPage() {
  const content = await fetchMarkdownFromGitHub(GITHUB_RAW_URLS.ai);

  return <EssayPage title="AI Essay" content={content} />;
}

export const metadata = {
  title: "AI Essay - Root Foundation",
  description: "AI essay from the Root Foundation",
};
