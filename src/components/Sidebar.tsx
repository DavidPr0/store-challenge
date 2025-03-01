"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, List, PlusCircle, Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuContent = (
    <div className="flex flex-col gap-2">
      <Link
        href="/"
        className="mb-6 text-xl font-bold text-white"
        onClick={() => setIsOpen(false)}
      >
        <Home className="inline mr-2 text-white" /> Loja Fake
      </Link>
      <nav className="flex flex-col gap-2">
        <Link
          href="/products"
          className={cn(
            "flex items-center gap-2 p-2 rounded text-white hover:bg-gray-700 hover:border-l-4 hover:border-blue-400 transition-all duration-200"
          )}
          onClick={() => setIsOpen(false)}
        >
          <List size={18} className="text-white" />
          <span>Produtos</span>
        </Link>
        <Link
          href="/products/create"
          className={cn(
            "flex items-center gap-2 p-2 rounded text-white hover:bg-gray-700 hover:border-l-4 hover:border-blue-400 transition-all duration-200"
          )}
          onClick={() => setIsOpen(false)}
        >
          <PlusCircle size={18} className="text-white" />
          <span>Criar Produto</span>
        </Link>
      </nav>
    </div>
  );

  return (
    <>
      {/* Botão hamburger para mobile */}
      <div className="sm:hidden p-4 bg-black">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar fixo para telas sm e maiores */}
      <div className="hidden sm:block w-64 bg-black border-r border-gray-700 p-4">
        {menuContent}
      </div>

      {/* Overlay mobile */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-90">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          <div className="mt-8 p-4">{menuContent}</div>
        </div>
      )}
    </>
  );
}
