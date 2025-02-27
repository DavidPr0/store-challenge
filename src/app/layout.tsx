// app/layout.tsx
import "./globals.css"; // <== Import do Tailwind

export const metadata = {
  title: "Loja Fake",
  description: "Desafio CRUD com Fake Store API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
