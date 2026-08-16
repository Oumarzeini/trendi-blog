const getPostDescription = (markdown, maxLength = 160) => {
  if (!markdown) return "";

  const text = markdown
    // Remove images
    .replace(/!\[.*?\]\(.*?\)/g, "")

    // Convert links to their text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

    // Remove headings
    .replace(/^#{1,6}\s+/gm, "")

    // Remove blockquotes
    .replace(/^>\s?/gm, "")

    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")

    // Remove inline code
    .replace(/`([^`]+)`/g, "$1")

    // Remove bold / italic
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")

    // Remove list markers
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")

    // Collapse whitespace
    .replace(/\s+/g, " ")

    .trim();

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}…`;
};

export default getPostDescription;
