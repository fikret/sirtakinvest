import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;
export type Project = CollectionEntry<'projects'>;

/** Yayında olan makaleler, `order` alanına göre sıralı. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Yayında olan projeler, `order` alanına göre sıralı. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const articleHref = (id: string) => `/blog/${id}`;
export const projectHref = (id: string) => `/projeler/${id}`;

/** Aynı kategoriden ilgili makaleler (kendisi hariç), eksikse diğerleriyle tamamlanır. */
export function relatedArticles(current: Article, all: Article[], n = 3) {
  const others = all.filter((a) => a.id !== current.id);
  const sameCat = others.filter((a) => a.data.category === current.data.category);
  const rest = others.filter((a) => a.data.category !== current.data.category);
  return [...sameCat, ...rest].slice(0, n).map((a) => ({
    href: articleHref(a.id),
    cardTitle: a.data.cardTitle,
    spot: a.data.spot,
    category: a.data.category,
  }));
}
