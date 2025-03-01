import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Loja Fake",
  description: "CRUD de Produtos com Next.js e Fake Store API",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-gray-50 p-4">
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </main>
        </div>
      </body>
    </html>
  );
}
