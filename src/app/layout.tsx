import {Inter} from 'next/font/google'
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: "Stadtrally"
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <header>
                <a
                    href="https://github.com/oskardotglobal"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Made with ❤️ by oskardotglobal
                </a>
            </header>

            <main>
                {children}
            </main>
        </body>
        </html>
    )
}
