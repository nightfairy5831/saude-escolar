"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartIcon, UsersIcon, StethoscopeIcon, BuildingIcon } from "@/components/Icons";
import { specialties } from "@/data/mockData";

type Role = "pai" | "medico" | "escola" | "";

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [crm, setCrm] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [schoolName, setSchoolName] = useState("");

  const roles: { value: Role; label: string; Icon: typeof UsersIcon }[] = [
    { value: "pai", label: "Pai/M\u00e3e", Icon: UsersIcon },
    { value: "medico", label: "M\u00e9dico", Icon: StethoscopeIcon },
    { value: "escola", label: "Escola", Icon: BuildingIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Blur circles */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-secondary-500/20 rounded-full blur-3xl" />

      {/* White card */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
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
          className="flex flex-col gap-5"
        >
          {/* Role selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Eu sou...
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    role === value
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${role === value ? "text-primary-600" : "text-gray-400"}`} />
                  <span className={`text-sm font-medium ${role === value ? "text-primary-700" : "text-gray-600"}`}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Full name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins"
            />
          </div>

          {/* Email */}
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

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins"
            />
          </div>

          {/* Doctor-specific fields */}
          {role === "medico" && (
            <>
              <div>
                <label htmlFor="crm" className="block text-sm font-medium text-gray-700 mb-1">
                  CRM
                </label>
                <input
                  id="crm"
                  type="text"
                  value={crm}
                  onChange={(e) => setCrm(e.target.value)}
                  placeholder="CRM/UF 000000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins"
                />
              </div>
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                  Especialidade
                </label>
                <select
                  id="specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins bg-white"
                >
                  <option value="">Selecione uma especialidade</option>
                  {specialties.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* School-specific fields */}
          {role === "escola" && (
            <div>
              <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                Nome da escola
              </label>
              <input
                id="schoolName"
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Nome da instituicao"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins"
              />
            </div>
          )}

          {/* Password */}
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

          {/* Confirm password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins"
            />
          </div>

          <button type="submit" className="gradient-btn w-full justify-center mt-2">
            Criar Conta
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          J&apos;a tem conta?{" "}
          <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
