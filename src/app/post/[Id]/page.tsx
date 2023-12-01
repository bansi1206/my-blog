import { Post } from "@/containers";
import axios from "axios";

export default async function ScreenPost({
  params,
}: {
  params: { id: number };
}) {
  return <Post />;
}
