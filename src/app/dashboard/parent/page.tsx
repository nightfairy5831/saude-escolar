"use client";

import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import {
  UsersIcon,
  CalendarIcon,
  MessageIcon,
  BellIcon,
  ArrowRightIcon,
  ClockIcon,
} from "@/components/Icons";
import {
  students,
  appointments,
  notifications,
  messages,
  formatDate,
} from "@/data/mockData";

const parentId = 1;
const parentName = "Maria";

const myStudents = students.filter((s) => s.parentId === parentId);
const myAppointments = appointments.filter((a) => a.parentId === parentId);
const upcomingAppointments = myAppointments.filter(
  (a) => a.status === "agendada"
);
const unreadMessages = messages.filter(
  (m) => m.receiverRole === "pai" && m.receiverId === parentId && !m.read
);
const unreadNotifications = notifications.filter((n) => !n.read);

const notificationDotColor: Record<string, string> = {
  agendamento: "bg-primary-500",
  lembrete: "bg-accent-500",
  resultado: "bg-secondary-500",
  mensagem: "bg-purple-500",
  alerta: "bg-red-500",
};

export default function ParentDashboard() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar role="parent" />
      <main className="page-container flex-1">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-title">Ola, {parentName}!</h1>
          <p className="page-subtitle capitalize">{dateStr}</p>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {myStudents.length}
                </p>
                <p className="text-xs text-gray-500">Filhos Cadastrados</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-secondary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {upcomingAppointments.length}
                </p>
                <p className="text-xs text-gray-500">Consultas Agendadas</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                <MessageIcon className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {unreadMessages.length}
                </p>
                <p className="text-xs text-gray-500">Mensagens Novas</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <BellIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {unreadNotifications.length}
                </p>
                <p className="text-xs text-gray-500">Notificacoes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Children Cards */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Meus Filhos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myStudents.map((student) => (
              <div key={student.id} className="card p-5">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={student.image}
                      alt={student.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {student.age} anos &middot; {student.grade}
                    </p>
                    <p className="text-sm text-gray-500">{student.school}</p>
                    {student.allergies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {student.allergies.map((allergy) => (
                          <span
                            key={allergy}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700"
                          >
                            {allergy}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/students/${student.id}`}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700 whitespace-nowrap flex items-center gap-1"
                  >
                    Ver Perfil
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Proximas Consultas
          </h2>
          {upcomingAppointments.length === 0 ? (
            <div className="card p-6 text-center text-gray-500 text-sm">
              Nenhuma consulta agendada no momento.
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((appt) => (
                <div key={appt.id} className="card p-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <CalendarIcon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900">
                          {appt.doctorName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appt.doctorSpecialty} &middot; {appt.studentName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <ClockIcon className="w-4 h-4" />
                        <span>
                          {formatDate(appt.date)} as {appt.time}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appt.type === "teleconsulta"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {appt.type === "teleconsulta"
                          ? "Teleconsulta"
                          : "Presencial"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 ml-13 pl-[52px]">
                    {appt.reason}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Notifications */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notificacoes Recentes
          </h2>
          <div className="card divide-y divide-gray-100">
            {notifications.slice(0, 4).map((notif) => (
              <div key={notif.id} className="p-4 flex items-start gap-3">
                <div className="mt-1.5">
                  <span
                    className={`block w-2.5 h-2.5 rounded-full ${
                      notificationDotColor[notif.type] || "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {notif.title}
                  </p>
                  <p className="text-sm text-gray-500">{notif.description}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {formatDate(notif.date.split(" ")[0])}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Acoes Rapidas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/appointments"
              className="card p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-secondary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    Agendar Consulta
                  </p>
                  <p className="text-xs text-gray-500">
                    Marque uma nova consulta
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href="/messages"
              className="card p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                  <MessageIcon className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    Mensagens
                  </p>
                  <p className="text-xs text-gray-500">
                    Fale com medicos e escola
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href="/students"
              className="card p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    Perfis dos Filhos
                  </p>
                  <p className="text-xs text-gray-500">
                    Veja informacoes de saude
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
