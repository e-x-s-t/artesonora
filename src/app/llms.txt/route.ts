import { getDocumentBySlug, getDocumentSlugs } from 'outstatic/server';
import { postsByType } from '@/lib/outstatic';
import { SITE_URL } from '@/lib/utils';

const SITE_DESCRIPTION =
  'Arte Sonora é uma prática artística coletiva desenvolvida pelo duo de artistas Franz Manata e Saulo Laudares, através de cursos, residências, exposições, happenings, programas de rádio e publicações. Documenta 15 anos desta prática.';

function section(title: string, indexPath: string, items: { title: string; slug: string }[], basePath: string) {
  const lines = [`## ${title}`, '', `- [${title}](${SITE_URL}${indexPath})`];
  items.forEach((item) => {
    lines.push(`- [${item.title}](${SITE_URL}${basePath}/${item.slug})`);
  });
  return lines.join('\n');
}

export async function GET() {
  const collaboratorSlugs = getDocumentSlugs('collaborators');
  const collaborators = collaboratorSlugs
    .map((slug) => getDocumentBySlug('collaborators', slug, ['title', 'slug']))
    .filter(Boolean) as { title: string; slug: string }[];

  const varanda = postsByType('Varanda Sonora');
  const historia = postsByType('Na História');
  const podcast = postsByType('Podcast');
  const mixtape = postsByType('Mixtape');

  const sections = [
    section('Colaboradores', '/colaboradores', collaborators, '/colaboradores'),
    section('Podcast', '/podcast', podcast, '/podcast'),
    section('Varanda Sonora', '/varanda-sonora', varanda, '/varanda-sonora'),
    section('Na História', '/na-historia', historia, '/na-historia'),
    section('Mixtape', '/mixtape', mixtape, '/mixtape'),
  ];

  const body = [
    '# Arte Sonora',
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    sections.join('\n\n'),
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
