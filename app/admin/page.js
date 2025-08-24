import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function DashboardPage() {
  const token = cookies().get("token")?.value;

  console.log(token, "token");

  if (!token) {
    redirect("/admin/login");
  } else {
    redirect("/admin/dashboard");
  }

  return <h1>Dashboard</h1>;
}
