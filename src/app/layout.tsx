// app/layout.tsx
import "./globals.css"; // <== Import do Tailwind

export const metadata = {
  title: "Store Challenge",
  description: "Desafio CRUD com Fake Store API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
