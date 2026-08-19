import { absoluteUrl, siteDescription, siteName } from '$lib/seo/site';

export function softwareApplicationSchema(name: string, description: string, path: string) {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${absoluteUrl(path)}#software`,
    name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description,
    url: absoluteUrl(path),
    publisher: {
      '@id': `${absoluteUrl('/')}#organization`
    }
  };
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${absoluteUrl('/')}#organization`,
    name: siteName,
    url: absoluteUrl('/'),
    description: siteDescription,
    logo: absoluteUrl('/dididecks-logo.svg')
  };
}

export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
