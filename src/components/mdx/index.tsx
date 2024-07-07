import { Callout } from './Callout';
import CodeBlock from './CodeBlock';
import { Image } from './Image';
import { ExternalLink } from './Link';
import { MDXComponents } from 'mdx/types';

export const MdxComponents: MDXComponents = {
  a: ExternalLink as any,
  img: Image as any,
  blockquote: Callout,
  Callout,
  pre: CodeBlock as any,
};
