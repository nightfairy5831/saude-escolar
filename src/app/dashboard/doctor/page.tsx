"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import {
  CalendarIcon,
  UsersIcon,
  VideoIcon,
  ClockIcon,
  ChartIcon,
  CheckIcon,
  StarIcon,
  SearchIcon,
  ArrowRightIcon,
  StethoscopeIcon,
  EyeIcon,
} from "@/components/Icons";
import {
  doctors,
  appointments,
  students,
  statusColors,
  statusLabels,
  formatDate,
} from "@/data/mockData";

type Tab = "agenda" | "pacientes" | "historico";

export default function DoctorDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("agenda");

  const doctor = doctors.find((d) => d.id === 1)!;
  const doctorAppointments = appointments.filter((a) => a.doctorId === 1);

  const today = "2026-04-01";
  const todayAppointments = doctorAppointments.filter((a) => a.date === today);
  const upcomingAppointments = doctorAppointments
    .filter((a) => a.date > today && a.status === "agendada")
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  const completedAppointments = doctorAppointments.filter(
    (a) => a.status === "concluida"
  );

  const uniqueStudentIds = [
    ...new Set(doctorAppointments.map((a) => a.studentId)),
  ];
  const uniqueStudents = uniqueStudentIds
    .map((id) => students.find((s) => s.id === id))
    .filter(Boolean) as (typeof students)[number][];

  const ratingStars = Array.from({ length: 5 }, (_, i) => i < Math.round(doctor.rating));

  const tabs: { key: Tab; label: string; icon: typeof CalendarIcon }[] = [
    { key: "agenda", label: "Agenda", icon: CalendarIcon },
    { key: "pacientes", label: "Pacientes", icon: UsersIcon },
    { key: "historico", label: "Historico", icon: ChartIcon },
  ];

  return (
    <div className="flex">
      <Sidebar role="doctor" />
      <main className="page-container">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="page-title">Ola, Dra. Camila!</h1>
            <div className="flex items-center gap-1">
              {ratingStars.map((filled, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${filled ? "text-accent-400" : "text-gray-300"}`}
                />
              ))}
              <span className="text-sm text-gray-500 ml-1">{doctor.rating}</span>
            </div>
          </div>
          <p className="page-subtitle">
            {doctor.crm} &middot; {doctor.specialty}
          </p>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Consultas Hoje</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-secondary-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Consultas</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">342</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-accent-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Pacientes Atendidos</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{uniqueStudentIds.length}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <StarIcon className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Avaliacao</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">4.9</p>
              <StarIcon className="w-5 h-5 text-accent-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                  isActive
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "agenda" && (
          <div className="space-y-6">
            {/* Today */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-primary-600" />
                Consultas de Hoje
              </h2>
              {todayAppointments.length === 0 ? (
                <div className="card p-6 text-center text-gray-500 text-sm">
                  Nenhuma consulta agendada para hoje.
                </div>
              ) : (
                <div className="space-y-3">
                  {todayAppointments.map((appt) => (
                    <div key={appt.id} className="card p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <UsersIcon className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{appt.studentName}</p>
                            <p className="text-sm text-gray-500">{appt.reason}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <ClockIcon className="w-4 h-4 text-gray-400" />
                            {appt.time}
                          </span>
                          <span
                            className={`${
                              appt.type === "teleconsulta"
                                ? "bg-primary-100 text-primary-700"
                                : "bg-secondary-100 text-secondary-700"
                            } inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                          >
                            {appt.type === "teleconsulta" ? (
                              <VideoIcon className="w-3 h-3 mr-1" />
                            ) : (
                              <StethoscopeIcon className="w-3 h-3 mr-1" />
                            )}
                            {appt.type === "teleconsulta" ? "Teleconsulta" : "Presencial"}
                          </span>
                          <span className={statusColors[appt.status]}>
                            {statusLabels[appt.status]}
                          </span>
                          {appt.type === "teleconsulta" && appt.status === "agendada" && (
                            <Link
                              href="/dashboard/doctor/teleconsulta"
                              className="gradient-btn-sm"
                            >
                              <VideoIcon className="w-4 h-4" />
                              Iniciar Teleconsulta
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-secondary-600" />
                Proximas Consultas
              </h2>
              {upcomingAppointments.length === 0 ? (
                <div className="card p-6 text-center text-gray-500 text-sm">
                  Nenhuma consulta futura agendada.
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments.map((appt) => (
                    <div key={appt.id} className="card p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
                            <UsersIcon className="w-5 h-5 text-secondary-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{appt.studentName}</p>
                            <p className="text-sm text-gray-500">{appt.reason}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">
                            {formatDate(appt.date)}
                          </span>
                          <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <ClockIcon className="w-4 h-4 text-gray-400" />
                            {appt.time}
                          </span>
                          <span
                            className={`${
                              appt.type === "teleconsulta"
                                ? "bg-primary-100 text-primary-700"
                                : "bg-secondary-100 text-secondary-700"
                            } inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                          >
                            {appt.type === "teleconsulta" ? (
                              <VideoIcon className="w-3 h-3 mr-1" />
                            ) : (
                              <StethoscopeIcon className="w-3 h-3 mr-1" />
                            )}
                            {appt.type === "teleconsulta" ? "Teleconsulta" : "Presencial"}
                          </span>
                          <span className={statusColors[appt.status]}>
                            {statusLabels[appt.status]}
                          </span>
                          {appt.type === "teleconsulta" && appt.status === "agendada" && (
                            <Link
                              href="/dashboard/doctor/teleconsulta"
                              className="gradient-btn-sm"
                            >
                              <VideoIcon className="w-4 h-4" />
                              Iniciar Teleconsulta
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "pacientes" && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <SearchIcon className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">Meus Pacientes</h2>
            </div>
            <div className="space-y-3">
              {uniqueStudents.map((student) => {
                const studentAppts = doctorAppointments
                  .filter((a) => a.studentId === student.id)
                  .sort((a, b) => b.date.localeCompare(a.date));
                const lastAppt = studentAppts[0];
                return (
                  <div key={student.id} className="card p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <UsersIcon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">
                            {student.age} anos &middot; {student.school}
                          </p>
                          {lastAppt && (
                            <p className="text-xs text-gray-400 mt-1">
                              Ultima consulta: {formatDate(lastAppt.date)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right text-xs text-gray-500 max-w-xs">
                          {student.conditions.length > 0 && (
                            <p>
                              <span className="font-medium text-gray-700">Condicoes:</span>{" "}
                              {student.conditions.join(", ")}
                            </p>
                          )}
                          {student.allergies.length > 0 && (
                            <p>
                              <span className="font-medium text-gray-700">Alergias:</span>{" "}
                              {student.allergies.join(", ")}
                            </p>
                          )}
                        </div>
                        <Link
                          href={`/students/${student.id}`}
                          className="gradient-btn-sm"
                        >
                          <EyeIcon className="w-4 h-4" />
                          Ver Perfil
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "historico" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-secondary-600" />
              Consultas Concluidas
            </h2>
            <div className="card overflow-hidden">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Paciente</th>
                    <th>Motivo</th>
                    <th>Notas</th>
                    <th>Tipo</th>
                    <th>Acao</th>
                  </tr>
                </thead>
                <tbody>
                  {completedAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-500 py-8">
                        Nenhuma consulta concluida encontrada.
                      </td>
                    </tr>
                  ) : (
                    completedAppointments.map((appt) => (
                      <tr key={appt.id}>
                        <td className="whitespace-nowrap">{formatDate(appt.date)}</td>
                        <td className="font-medium text-gray-900">{appt.studentName}</td>
                        <td>{appt.reason}</td>
                        <td className="max-w-xs truncate" title={appt.notes}>
                          {appt.notes.length > 60
                            ? appt.notes.substring(0, 60) + "..."
                            : appt.notes}
                        </td>
                        <td>
                          <span
                            className={`${
                              appt.type === "teleconsulta"
                                ? "bg-primary-100 text-primary-700"
                                : "bg-secondary-100 text-secondary-700"
                            } inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                          >
                            {appt.type === "teleconsulta" ? "Teleconsulta" : "Presencial"}
                          </span>
                        </td>
                        <td>
                          <Link
                            href={`/appointments/${appt.id}`}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1"
                          >
                            Ver Detalhes
                            <ArrowRightIcon className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
