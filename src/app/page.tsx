import { Home } from "@/containers";
import axios from "axios";

export default async function ScreenHome({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const getPosts = async (keyword: string, page: number = 1) => {
    try {
      const offset = (page - 1) * 2;
      const apiUrl = `http://localhost:3000/api/post?keyword=${keyword}&limit=2&offset=${offset}`;
      const posts = await axios.get(apiUrl);
      return posts.data;
    } catch (error) {
      return [];
    }
  };

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const posts = await getPosts(searchParams?.keyword || "", page);

  return <Home posts={posts} />;
}
