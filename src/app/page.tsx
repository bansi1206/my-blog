import { Home } from '@/containers';
import axios from 'axios';

const getPosts = async (keyword: string) => {
  try {
    const posts = await axios.get(
      `http://localhost:3000/api/post?keyword=${keyword}`
    );
    return posts.data;
  } catch (error) {
    return [];
  }
};

export default async function ScreenHome({
  searchParams,
}: {
  searchParams: { keyword: string };
}) {
  const posts = await getPosts(searchParams?.keyword || '');

  return <Home posts={posts} />;
}
