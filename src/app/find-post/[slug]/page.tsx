import { FindPost } from "@/containers";
import axios from "axios";
import parse from "url-parse";

const getPostByCategory = async (slug: string, page: number = 1) => {
  try {
    const offset = (page - 1) * 2;
    console.log("Offset:", offset);
    const apiUrl = `http://localhost:3000/api/find-post/${slug}?limit=2&offset=${offset}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export default async function ScreenFindPost({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  console.log("--------------------------------------------------------");
  console.log("params", params);
  console.log("--------------------------------------------------------");

  const { slug } = params;

  const post = await getPostByCategory(slug, page);

  return <FindPost posts={post} categoryId={slug} />;
}
