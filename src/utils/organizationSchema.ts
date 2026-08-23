import { SITE } from "../config";
import { absUrl, CONTACT_EMAIL, SAME_AS, SITE_NAME } from "./siteIdentity";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: SITE.author,
  url: SITE.website,
  description: SITE.desc,
  email: CONTACT_EMAIL,
  logo: absUrl("/assets/logo.png"),
  image: absUrl("/assets/logo.png"),
  sameAs: [...SAME_AS],
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    contactType: "author",
    url: absUrl("/developers"),
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "NO",
  },
} as const;

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
