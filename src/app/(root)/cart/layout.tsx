import { getSession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession()
    if (session) return redirect('/profile/setting')

    return (
        <>
            {children}
        </>
    );
}