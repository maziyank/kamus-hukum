import Head from "next/head";
import { useRouter } from "next/router";

export interface SeoTagsProps {
  title: string;
  description: string;
  image?: string;
}

export default function SeoTags({ title, description, image }: SeoTagsProps) {
  const rootUrl =
    process.env.NEXT_PUBLIC_ROOT_URL ?? "https://www.kamus-hukum.com";
  const router = useRouter();
  const url = rootUrl + router.asPath;

  image = image ?? rootUrl + "/logo-with-title.png";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@maziyank" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Kamus Hukum Indonesia" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebSite",
            name: title,
            about: description,
            url: url,
          }),
        }}
      />
    </Head>
  );
}
