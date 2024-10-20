import Nav from "@/components/header/nav";
import Container from "@/components/ui/container";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <>
            <Nav />
            <section className="py-12">
                <Container>
                    {children}
                </Container>
            </section>
        </>
    );
}