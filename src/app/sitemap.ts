import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tidephysics.com');
const API_BASE = 'http://52.64.117.32:8000/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  let courseRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/courses`, { next: { revalidate: 3600 } }).catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      const courses = data.data || (Array.isArray(data) ? data : []);
      courseRoutes = courses.map((c: { _id?: string; updatedAt?: string }) => ({
        url: `${BASE_URL}/courses/${c._id}`,
        lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      }));
    }
  } catch {
    // Fallback if API is unreachable during build
  }

  // Ensure default fallback courses are represented
  const fallbackIds = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  const existingUrls = new Set(courseRoutes.map((r) => r.url));
  const fallbackRoutes: MetadataRoute.Sitemap = fallbackIds
    .filter((id) => !existingUrls.has(`${BASE_URL}/courses/${id}`))
    .map((id) => ({
      url: `${BASE_URL}/courses/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...courseRoutes, ...fallbackRoutes];
}
