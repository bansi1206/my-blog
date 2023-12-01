import { Post } from '@/containers';
import axios from 'axios';

const getPostDetail = async (slug: string) => {
  try {
    const posts = await axios.get(`http://localhost:3000/api/post/${slug}`);
    return posts.data;
  } catch (error) {
    return {};
  }
};

export default async function ScreenPost({
  params,
}: {
  params: { slug: string };
}) {
  console.log('--------------------------------------------------------')
  console.log('params', params)
  console.log('--------------------------------------------------------')
  const post = await getPostDetail(params.slug);

  return <Post post={post} />;
}
