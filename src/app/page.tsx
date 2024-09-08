import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/dal";

export default async function Home() {
  const user = await getSession()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form action={logout}>
          {user?.isAuth && <Button type="submit">
            logout
          </Button>}
        </form>
      </main>
    </div>
  );
}
