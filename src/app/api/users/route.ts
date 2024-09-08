import { getSession } from "@/lib/dal";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  const session = await getSession();
  console.log(session);

  return Response.json({ session });
}
