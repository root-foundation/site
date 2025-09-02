import { marked } from "marked";
import markedFootnote from "marked-footnote";

const GITHUB_BASE_URL = "https://github.com/root-foundation/root/blob/main";
const GITHUB_RAW_BASE_URL =
  "https://raw.githubusercontent.com/root-foundation/root/main";

// Utility function to generate id from text content (same as in MDX components)
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function processMarkdownContent(markdown: string): string {
  // Replace references to other markdown files with local routes
  let processed = markdown
    .replace(
      /\[([^\]]+)\]\(whitepaper\.md(#[^)]*)?\)/g,
      (match, text, hash) => {
        return `[${text}](/whitepaper${hash || ""})`;
      }
    )
    .replace(/\[([^\]]+)\]\(ai\.md(#[^)]*)?\)/g, (match, text, hash) => {
      return `[${text}](/ai${hash || ""})`;
    });

  // Convert relative paths to GitHub URLs
  // Handle image references like appendix/assets/emotion.png
  processed = processed.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
    `![$1](${GITHUB_RAW_BASE_URL}/$2)`
  );

  // Handle HTML img tags with relative src paths
  // Convert <img src="appendix/assets/image.png" ...> to use GitHub raw URLs
  processed = processed.replace(
    /<img\s+([^>]*?)src="(?!https?:\/\/)([^"]+)"([^>]*?)>/g,
    `<img $1src="${GITHUB_RAW_BASE_URL}/$2"$3>`
  );

  // Handle relative link references (not starting with http/https, /, or #)
  processed = processed.replace(
    /\[([^\]]+)\]\((?!https?:\/\/)(?!\/)(?!#)((?!whitepaper|ai)[^)]+)\)/g,
    `[$1](${GITHUB_BASE_URL}/$2)`
  );

  return processed;
}

function addTargetBlankToLinks(html: string): string {
  // Add target="_blank" to all links that don't already have it, except for hash links
  return html.replace(
    /<a\s+([^>]*?)href="([^"]*)"([^>]*?)>/g,
    (match, before, href, after) => {
      // Don't add target="_blank" to hash links (internal page anchors)
      if (href.startsWith("#")) {
        // Remove any existing target attribute for hash links
        const cleanBefore = before.replace(
          /target\s*=\s*["'][^"']*["']\s*/g,
          ""
        );
        const cleanAfter = after.replace(/target\s*=\s*["'][^"']*["']\s*/g, "");
        return `<a ${cleanBefore}href="${href}"${cleanAfter}>`;
      }

      // For external links, add target="_blank" if not already present
      if (match.includes("target=")) {
        return match; // Already has target attribute, don't modify
      }
      return `<a ${before}href="${href}"${after} target="_blank" rel="noopener noreferrer">`;
    }
  );
}

export async function fetchMarkdownFromGitHub(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown: ${response.statusText}`);
    }
    const markdown = await response.text();

    // Process the markdown content before parsing
    const processedMarkdown = processMarkdownContent(markdown);

    // Configure marked with custom renderer for headings with IDs
    const renderer = new marked.Renderer();

    // Override heading renderer to add IDs
    renderer.heading = function ({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const id = generateId(text);
      return `<h${depth} id="${id}">${text}</h${depth}>`;
    };

    // Override code renderer to handle Mermaid diagrams
    renderer.code = function ({ text, lang }) {
      if (lang === "mermaid") {
        // Create a unique ID for each diagram
        const diagramId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        return `<div class="mermaid" id="${diagramId}">${text}</div>`;
      }
      // Default code block rendering with proper mobile constraints
      return `<pre style="max-width: 100%; overflow-x: auto; box-sizing: border-box;"><code class="${
        lang ? `language-${lang}` : ""
      }">${text}</code></pre>`;
    };

    // Override table renderer to output plain text (terminal-style)
    renderer.table = function ({ header, rows }) {
      // Get the raw text from header and rows
      const headerTexts = header.map((cell) =>
        this.parser.parseInline(cell.tokens)
      );
      const rowTexts = rows.map((row) =>
        row.map((cell) => this.parser.parseInline(cell.tokens))
      );

      // Calculate column widths
      const colWidths = headerTexts.map((header, i) => {
        const maxRowWidth = Math.max(
          ...rowTexts.map((row) => row[i]?.length || 0)
        );
        return Math.max(header.length, maxRowWidth);
      });

      // Create the table string
      let tableStr = "";

      // Header row
      const headerRow = headerTexts
        .map((text, i) => text.padEnd(colWidths[i]))
        .join(" | ");
      tableStr += headerRow + "\n";

      // Separator row
      const separator = colWidths.map((width) => "-".repeat(width)).join("-|-");
      tableStr += separator + "\n";

      // Data rows
      rowTexts.forEach((row) => {
        const rowStr = row
          .map((text, i) => (text || "").padEnd(colWidths[i]))
          .join(" | ");
        tableStr += rowStr + "\n";
      });

      return `<pre style="font-family: monospace; white-space: pre; overflow-x: auto; background: #f5f5f5; padding: 1rem; border-radius: 4px; margin: 1rem 0;">${tableStr}</pre>`;
    };

    // Use the footnote extension
    marked.use(markedFootnote());

    marked.setOptions({
      breaks: true,
      gfm: true,
      renderer: renderer,
    });

    // Convert to HTML and then add target="_blank" to all links
    const html = await marked(processedMarkdown);
    return addTargetBlankToLinks(html);
  } catch (error) {
    console.error("Error fetching markdown:", error);
    return "<p>Failed to load content.</p>";
  }
}

export const GITHUB_RAW_URLS = {
  whitepaper:
    "https://raw.githubusercontent.com/root-foundation/root/main/whitepaper.md",
  ai: "https://raw.githubusercontent.com/root-foundation/root/main/ai.md",
  homan:
    "https://raw.githubusercontent.com/root-foundation/root/refs/heads/main/tokens/%40homan.md",
} as const;
