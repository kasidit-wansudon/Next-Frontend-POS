import { Link } from "@nextui-org/link";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import { PageEnum } from "@enum/";
export default function DefaultLayout({
  children,
  title,
  props,
}: {
  children: React.ReactNode;
  title: PageEnum;
  props?:any
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar title={title}  props={props}/>
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          {children}
        </section>
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer>
    </div>
  );
}
