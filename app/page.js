import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/homepage");
  }
  return <></>;
}
