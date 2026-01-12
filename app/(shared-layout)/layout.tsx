import { Footer } from "@/components/web/Footer";
import { Navbar } from "@/components/web/navbar";

export default function SharedLayout({children}: {children: React.ReactNode}) {
    return (
        <>
        <Navbar />
        {children}
        <Footer />
        </>
    )
}