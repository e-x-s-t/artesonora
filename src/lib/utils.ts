export function absoluteUrl(path: string) {
  return `${
    process.env?.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }${path}`;
}

export function excerptFromMarkdown(markdown: string, maxLength = 155) {
  const plainText = markdown
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[#*_`>~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`;
}

export function formatPostType(type: string) {
  switch (type) {
    case 'Na História':
      return 'na-historia';
    case 'Podcast':
      return 'podcast';
    case 'Mixtape':
      return 'mixtape';
    case 'Varanda Sonora':
      return 'varanda-sonora';
    default:
      return type;
  }
}
