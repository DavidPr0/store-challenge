import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo à Nossa Loja!</h1>
      <Link
        href="/products"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ver Produtos
      </Link>
    </main>
  );
}
