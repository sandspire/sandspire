import { redirect } from "next/navigation";

// /home-3 is now the main homepage at "/". Send any old links there.
export default function HomeThreeRedirect() {
  redirect("/");
}
