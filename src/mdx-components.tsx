import defaultMdxComponents from 'fumadocs-ui/mdx';
import type {MDXComponents} from 'mdx/types';
import {Mermaid} from '@/mermaid';
import { APIPage } from 'fumadocs-openapi/ui';
import { openapi } from '@/lib/openapi';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        Mermaid,
        APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />,
        ...components,
    };
}
