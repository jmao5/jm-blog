import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';

const BASE_PATH = '/src/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

interface PostMatter {
  title: string;
  date: Date;
  tags: string[];
}

export interface Post extends PostMatter {
  url: string;
  slug: string;
  categoryPath: string;
  categoryPublicName: string;
  content: string;
}

// target folder의 모든 mdx 파일 조회
const getPostPaths = (): string[] => sync(`${POSTS_PATH}/**/*.mdx`);

// mdx 파일 parsing
const parsePost = async (postPath: string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = await parsePostDetail(postPath);
  return {
    ...postAbstract,
    ...postDetail,
  };
};

const parsePostAbstract = (postPath: string) => {
  const normalizedBasePath = BASE_PATH.replace(/^\//, '');
  const filePath = postPath
    .replace(/\\/g, '/')
    .slice(postPath.replace(/\\/g, '/').indexOf(normalizedBasePath))
    .replace(`${normalizedBasePath}/`, '')
    .replace('.mdx', '');

  const [categoryPath, slug] = filePath.split('/');

  return {
    url: `blog/${categoryPath}/${slug}`,
    categoryPath,
    categoryPublicName: getCategoryPublicName(categoryPath),
    slug,
  };
};

const parsePostDetail = async (postPath: string) => {
  const file = fs.readFileSync(postPath, 'utf8');
  const { data, content } = matter(file);
  return { ...(data as PostMatter), content };
};

const getCategoryPublicName = (dirPath: string): string =>
  dirPath
    .split('_')
    .map((token) => token[0].toUpperCase() + token.slice(1))
    .join(' ');

const sortPostList = (postList: Post[]): Post[] =>
  postList.sort((a, b) => b.date.getTime() - a.date.getTime());

export const getPostList = async (): Promise<Post[]> => {
  const postPaths = getPostPaths();
  const result = await Promise.all(postPaths.map(parsePost));
  return sortPostList(result);
};

export const getPostParamList = (): { category: string; slug: string }[] => {
  const postPaths = getPostPaths();
  return postPaths
    .map(parsePostAbstract)
    .map(({ categoryPath, slug }) => ({ category: categoryPath, slug }));
};

export const getPostDetail = async (
  category: string,
  slug: string
): Promise<Post> => {
  const filePath = `${POSTS_PATH}/${category}/${slug}.mdx`;
  return parsePost(filePath);
};
