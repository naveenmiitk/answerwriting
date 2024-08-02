import { getUserAuth } from "@/lib/auth/utils";

export async function GET(request: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response(JSON.stringify({message : "Please Login to Upload Answer."}), { status: 401 });
  const user = session.user;
  return new Response(JSON.stringify(user), { status: 200 });
}
