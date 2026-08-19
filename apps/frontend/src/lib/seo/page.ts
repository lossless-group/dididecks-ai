import { definePageMetaTags } from 'svelte-meta-tags';
import type { JsonLdProps } from 'svelte-meta-tags';

import { absoluteUrl, defaultSocialImagePath, siteDescription, siteName } from '$lib/seo/site';

type Breadcrumb = {
  name: string;
  path: string;
};

type PageSeoInput = {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  breadcrumbs?: Breadcrumb[];
  noindex?: boolean;
  schema?: JsonLdProps['schema'];
};

export function definePageSeo({
  title,
  description = siteDescription,
  path,
  keywords = [],
  breadcrumbs = [],
  noindex = false,
  schema
}: PageSeoInput): {
  pageMetaTags: ReturnType<typeof definePageMetaTags>['pageMetaTags'];
  pageJsonLd: JsonLdProps['schema'];
} {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(defaultSocialImagePath);

  return {
    ...definePageMetaTags({
      title,
      description,
      canonical,
      robots: noindex ? 'noindex, nofollow' : 'index, follow',
      keywords,
      openGraph: {
        url: canonical,
        type: 'website',
        title,
        description,
        siteName,
        image: {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} social preview`
        }
      },
      twitter: {
        cardType: 'summary_large_image',
        title,
        description,
        image: imageUrl
      }
    }),
    pageJsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: title,
          description,
          isPartOf: {
            '@id': `${absoluteUrl('/')}#website`
          }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: siteName,
              item: absoluteUrl('/')
            },
            ...breadcrumbs.map((breadcrumb, index) => ({
              '@type': 'ListItem',
              position: index + 2,
              name: breadcrumb.name,
              item: absoluteUrl(breadcrumb.path)
            }))
          ]
        },
        ...(schema
          ? Array.isArray(schema)
            ? schema
            : [schema]
          : [])
      ]
    }
  };
}
