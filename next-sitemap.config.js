const siteUrl =
  process.env.NEXT_PUBLIC_ROOT_URL ?? "https://www.kamus-hukum.com";

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/definisi-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/definisi-sitemap.xml`],
  },
};

module.exports = config;
