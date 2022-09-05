import fs from "fs";
import { parse } from "yaml";

export interface PageLink {
  icon?: string;
  warningText?: string;
  text: string;
  url: string;
}

export interface PageData {
  // true if page should be listed in the root site index
  listed?: true;
  title: string;
  description?: string;
  pageLinks: PageLink[];
}

export interface SiteData {
  site: {
    name: string;
    description: string;
  };
  pages: {
    [slug: string]: PageData;
  };
}

let data: SiteData;
export const getSiteData = async (): Promise<SiteData> => {
  const file = fs.readFileSync("data/siteData.yaml", "utf8");
  if (data) return data;
  data = parse(file) as SiteData;
  return Promise.resolve(data);
};

export const getPageForSlug = async (
  slug: string
): Promise<PageData | undefined> => {
  const data = await getSiteData();
  return data[slug];
};

export const getSiteMetadata = async () => {
  const data = await getSiteData();
  return data["site"];
};
