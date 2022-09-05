import classNames from "classnames";
import { InferGetStaticPropsType, GetStaticProps } from "next";
import Head from "next/head";
import { Layout } from "../../components/Layout";
import { getSiteData, PageData, SiteData } from "../../lib/api";
import { useDebugData } from "../../lib/hooks";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PageLinks = ({ pageLinks }: { pageLinks: PageData["pageLinks"] }) => {
  if (pageLinks.length === 0) {
    return (
      <p>
        <em>No links yet!</em>
      </p>
    );
  } else {
    return (
      <div className="md:max-w-sm md:mx-auto mt-4 text-center">
        {pageLinks.map((link, index) => {
          const linkClass = classNames(
            "rounded",
            "bg-cyan-900",
            "py-3",
            "text-white",
            {
              "mt-5": index > 0,
            }
          );

          return (
            <a href={link.url} key={index}>
              <div className={linkClass}>{link.text}</div>
            </a>
          );
        })}
      </div>
    );
  }
};

export default function LinkPage(props: Props) {
  useDebugData({ data: props });
  const { site, page } = props;
  const { title, description, pageLinks } = page;

  return (
    <Layout siteMetadata={site}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="md:shadow-md md:max-w-md p-4 mt-6 md:mx-auto h-full bg-cyan-100 text-center">
        <h2>{page.title}</h2>
        {description && <p>{description}</p>}
        <PageLinks pageLinks={pageLinks} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<
  { site: SiteData["site"]; page: PageData },
  { slug: string }
> = async (ctx) => {
  const {
    params: { slug },
  } = ctx;
  const { site, pages } = await getSiteData();
  const thisPage = pages[slug];
  if (!thisPage) {
    return { notFound: true };
  }
  return {
    props: {
      site,
      page: thisPage,
    },
    // cache static pages and regenerate after 10 min
    revalidate: 60 * 10,
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const siteData = await getSiteData();
  const pageSlugs = Object.keys(siteData.pages);

  // Get the paths we want to pre-render based on posts
  const paths = pageSlugs.map((slug) => ({
    params: { slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
