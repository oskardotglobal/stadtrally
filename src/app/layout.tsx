import React from "react";
import Header from "@/components/Header";

import "../styles/globals.scss";

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
        </body>
        </html>
    )
}
