import Link from "next/link";
import { getSiteData, SiteData } from "../lib/api";

export const Layout = ({
  siteMetadata,
  children,
}: {
  siteMetadata: SiteData["site"];
  children: JSX.Element | Array<JSX.Element>;
}): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col align-start">
      <nav className="w-full flex bg-slate-900 h-24 pl-6 py-6">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white text-center">
            {siteMetadata.name}
          </h1>
        </Link>
      </nav>

      <main className="flex-1 h-full">{children}</main>

      <footer className="self-end w-full text-white bg-slate-700 h-20">
        <div className="container mx-auto px-2 py-2">{siteMetadata.name}</div>
      </footer>
    </div>
  );
};
