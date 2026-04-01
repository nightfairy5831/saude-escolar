"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartIcon, HomeIcon, CalendarIcon, MessageIcon, UsersIcon, UserIcon, ChartIcon, BellIcon, BuildingIcon, FileIcon, StethoscopeIcon } from "./Icons";

interface SidebarProps {
  role: "parent" | "doctor" | "school";
}

const roleLinks = {
  parent: [
    { label: "Dashboard", href: "/dashboard/parent", icon: HomeIcon },
    { label: "Meus Filhos", href: "/students", icon: UsersIcon },
    { label: "Consultas", href: "/appointments", icon: CalendarIcon },
    { label: "Mensagens", href: "/messages", icon: MessageIcon },
    { label: "Notificacoes", href: "/dashboard/parent/notifications", icon: BellIcon },
  ],
  doctor: [
    { label: "Dashboard", href: "/dashboard/doctor", icon: HomeIcon },
    { label: "Agenda", href: "/appointments", icon: CalendarIcon },
    { label: "Pacientes", href: "/dashboard/doctor/patients", icon: UsersIcon },
    { label: "Teleconsulta", href: "/dashboard/doctor/teleconsulta", icon: StethoscopeIcon },
    { label: "Mensagens", href: "/messages", icon: MessageIcon },
  ],
  school: [
    { label: "Dashboard", href: "/dashboard/school", icon: HomeIcon },
    { label: "Alunos", href: "/dashboard/school/students", icon: UsersIcon },
    { label: "Medicos", href: "/dashboard/school/doctors", icon: UserIcon },
    { label: "Relatorios", href: "/dashboard/school/reports", icon: ChartIcon },
    { label: "Comunicados", href: "/dashboard/school/communications", icon: FileIcon },
  ],
};

const roleLabels = {
  parent: "Portal dos Pais",
  doctor: "Portal Medico",
  school: "Portal da Escola",
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const links = roleLinks[role];
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-dark z-40 flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <HeartIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">SaudeEscolar</span>
        </Link>
        <p className="text-xs text-white/50 mt-2 pl-10">{roleLabels[role]}</p>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className={isActive ? "sidebar-link-active" : "sidebar-link"}>
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link href="/" className="sidebar-link text-xs">
          <BuildingIcon className="w-4 h-4" />
          Voltar ao Site
        </Link>
      </div>
    </aside>
  );
}
