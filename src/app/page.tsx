import { Home } from "@/containers";
import axios from "axios";

const getPosts = async () => {
  try {
    const posts = await axios.get("http://localhost:3000/api/post");
    return posts.data;
  } catch (error) {
    return [];
  }
};

export default async function ScreenHome() {
  const posts = await getPosts();

  return <Home posts={posts} />;
}
