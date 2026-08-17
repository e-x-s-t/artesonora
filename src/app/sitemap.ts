import { MetadataRoute } from 'next';
import { getDocuments, getDocumentSlugs } from 'outstatic/server';
import { SITE_URL as BASE_URL } from '@/lib/utils';
import { postsByType } from '@/lib/outstatic';

function postSlugsByType(typeLabel: string) {
  return postsByType(typeLabel).map((post) => post.slug);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/podcast`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/mixtape`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/varanda-sonora`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/na-historia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/ativacoes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/colaboradores`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
  ];

  const collaboratorRoutes: MetadataRoute.Sitemap = getDocumentSlugs(
    'collaborators'
  ).map((slug) => ({
    url: `${BASE_URL}/colaboradores/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
  }));

  const postRoutes: MetadataRoute.Sitemap = getDocumentSlugs('posts').map(
    (slug) => ({
      url: `${BASE_URL}/posts/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    })
  );

  const projectRoutes: MetadataRoute.Sitemap = getDocumentSlugs('projects').map(
    (slug) => ({
      url: `${BASE_URL}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    })
  );

  const varandaRoutes: MetadataRoute.Sitemap = postSlugsByType(
    'Varanda Sonora'
  ).map((slug) => ({
    url: `${BASE_URL}/varanda-sonora/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
  }));

  const historiaRoutes: MetadataRoute.Sitemap = postSlugsByType(
    'Na História'
  ).map((slug) => ({
    url: `${BASE_URL}/na-historia/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
  }));

  const podcastRoutes: MetadataRoute.Sitemap = postSlugsByType('Podcast').map(
    (slug) => ({
      url: `${BASE_URL}/podcast/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    })
  );

  const mixtapeRoutes: MetadataRoute.Sitemap = postSlugsByType('Mixtape').map(
    (slug) => ({
      url: `${BASE_URL}/mixtape/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    })
  );

  const newsSlugs = getDocuments('news', ['slug', 'status'])
    .filter((n) => n.status === 'published')
    .map((n) => n.slug);
  const ativacoesRoutes: MetadataRoute.Sitemap = newsSlugs.map((slug) => ({
    url: `${BASE_URL}/ativacoes/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
  }));

  return [
    ...staticRoutes,
    ...collaboratorRoutes,
    ...postRoutes,
    ...projectRoutes,
    ...varandaRoutes,
    ...historiaRoutes,
    ...podcastRoutes,
    ...mixtapeRoutes,
    ...ativacoesRoutes,
  ];
}
