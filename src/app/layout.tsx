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
                <p>Made with ❤️ by oskardotglobal</p>
            </footer>
        </body>
        </html>
    )
}
