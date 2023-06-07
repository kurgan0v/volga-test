import '@/styles/globals.css'
import {Raleway} from 'next/font/google'
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Raleway({subsets: ['cyrillic']})

export const metadata = {
    title: 'ВОЛГА-ТЕСТ | СЕРТИФИКАЦИЯ',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </body>
        </html>
    )
}
