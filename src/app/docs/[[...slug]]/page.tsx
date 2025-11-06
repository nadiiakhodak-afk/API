import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import React from "react";
import type { MDXComponents } from 'mdx/types';

type TocProp = React.ComponentProps<typeof DocsPage>['toc'];
type MDXContent = (props: { components?: MDXComponents }) => React.ReactElement;

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  type MDXPageData = {
    body: MDXContent;
    toc?: TocProp;
    full?: boolean;
    title: string;
    description?: string;
  };

  const data = page.data as Partial<MDXPageData>;

  if (!data.body) {
    notFound();
  }

  const MDX = data.body as MDXContent;
  const toc = (data.toc ?? undefined) as TocProp;

  return (
    <DocsPage toc={toc} full={data.full}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
