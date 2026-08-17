import { getDocuments } from 'outstatic/server';

type PostWithType = {
  title: string;
  type: { label: string }[];
  slug: string;
  status: string;
};

export function postsByType(typeLabel: string) {
  const allPosts = getDocuments('posts', [
    'title',
    'type',
    'slug',
    'status',
  ]) as unknown as PostWithType[];
  return allPosts.filter(
    (post) =>
      post.type?.map((type) => type.label).includes(typeLabel) &&
      post.status === 'published'
  );
}
