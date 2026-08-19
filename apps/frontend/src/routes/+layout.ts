import { defineBaseMetaTags } from 'svelte-meta-tags';
import type { LayoutLoad } from './$types';

import { absoluteUrl, defaultSocialImagePath, siteDescription, siteName, siteTagline } from '$lib/seo/site';

export const load: LayoutLoad = () => {
  const siteUrl = absoluteUrl('/');
  const imageUrl = absoluteUrl(defaultSocialImagePath);

  return {
    ...defineBaseMetaTags({
      title: siteName,
      description: siteDescription,
      canonical: siteUrl,
      robots: 'index, follow',
      openGraph: {
        url: siteUrl,
        type: 'website',
        title: siteName,
        description: siteDescription,
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
        title: siteName,
        description: siteDescription,
        image: imageUrl
      },
      additionalMetaTags: [
        {
          name: 'application-name',
          content: siteName
        },
        {
          name: 'theme-color',
          content: '#08111f'
        }
      ],
      additionalLinkTags: [
        {
          rel: 'icon',
          href: absoluteUrl('/dididecks-favicon.svg'),
          type: 'image/svg+xml'
        }
      ]
    }),
    baseJsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${siteUrl}#organization`,
          name: siteName,
          url: siteUrl,
          logo: absoluteUrl('/dididecks-logo.svg')
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}#website`,
          url: siteUrl,
          name: siteName,
          description: siteDescription,
          publisher: {
            '@id': `${siteUrl}#organization`
          }
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${siteUrl}#application`,
          name: siteName,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: siteTagline,
          url: siteUrl
        }
      ]
    }
  };
};
