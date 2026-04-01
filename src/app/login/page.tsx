"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartIcon } from "@/components/Icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Blur circles */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-secondary-500/20 rounded-full blur-3xl" />

      {/* White card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <HeartIcon className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold gradient-text">SaudeEscolar</span>
          </div>
          <p className="text-sm text-gray-500">Telemedicina Escolar</p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins"
            />
          </div>

          <div className="flex justify-end">
            <Link href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Esqueceu a senha?
            </Link>
          </div>

          <button type="submit" className="gradient-btn w-full justify-center mt-2">
            Entrar
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          N&apos;ao tem conta?{" "}
          <Link href="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
