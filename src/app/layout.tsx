import React from "react";
import Header from "@/components/Header";

export const metadata = {
    title: "Stadtrally"
}

export default function RootLayout({children}: {children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
            <Header />

            <main>
                {children}
            </main>

            <footer>
                <p>
                    (c) 2023 Oskar Manhart
                    <br />
                    <a href="https://github.com/oskardotglobal/stadtrally" target="_blank">View Source</a>
                </p>
            </footer>
        </body>
        </html>
    )
}
