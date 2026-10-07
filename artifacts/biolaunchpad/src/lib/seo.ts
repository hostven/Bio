import { useEffect } from 'react';
import { SITE_URL } from './site';

type Seo = { title: string; description: string; path: string; image?: string; type?: 'website' | 'article' };

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export function useSeo({ title, description, path, image = '/hero.jpg', type = 'website' }: Seo) {
  useEffect(() => {
    const full = title.includes('Biolaunchpad') ? title : `${title} | Biolaunchpad`;
    const url = `${SITE_URL}${path}`;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:title', full);
    setMeta('name', 'twitter:description', description);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, path, image, type]);
}
