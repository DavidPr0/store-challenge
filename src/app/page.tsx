import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8">
        Bem-vindo à Nossa Loja!
      </h1>
      <Link
        href="/products"
        className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Ver Produtos
      </Link>
    </main>
  );
}
