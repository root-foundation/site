import { fetchMarkdownFromGitHub, GITHUB_RAW_URLS } from "@/lib/markdown";
import EssayPage from "@/components/EssayPage";

export default async function HomanPage() {
  const content = await fetchMarkdownFromGitHub(GITHUB_RAW_URLS.homan);

  return <EssayPage content={content} />;
}

const title = "@homan";
const description = "Homan's personal token";

export const metadata = {
  metadataBase: new URL("https://onroot.net"),
  title,
  description,
  openGraph: {
    title,
    description,
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title,
  //   description,
  //   images: [url],
  // },
};
