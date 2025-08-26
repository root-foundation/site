import { fetchMarkdownFromGitHub, GITHUB_RAW_URLS } from "@/lib/markdown";
import EssayPage from "@/components/EssayPage";

export default async function WhitepaperPage() {
  const content = await fetchMarkdownFromGitHub(GITHUB_RAW_URLS.whitepaper);

  return <EssayPage title="Whitepaper" content={content} />;
}

export const metadata = {
  title: "RootNet Whitepaper",
  description: "Prosperity through unity.",
};
