/** Single source of truth for the public site URL. Change here on a domain move. */
export const SITE_URL = "https://petersbergsstigen.asuscomm.com";

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const OG_CARD = absoluteUrl("/assets/og-card.png");

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  image?: string;
};

/** Builds the meta + links entries shared by every leaf route. */
export function seo({ title, description, path, type = "website", image }: SeoInput) {
  const url = absoluteUrl(path);
  const img = image ? (image.startsWith("http") ? image : absoluteUrl(image)) : OG_CARD;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
