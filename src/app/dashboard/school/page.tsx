"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import {
  UsersIcon,
  StethoscopeIcon,
  ChartIcon,
  CalendarIcon,
  CheckIcon,
  AlertIcon,
  SearchIcon,
  DownloadIcon,
  BuildingIcon,
  ClockIcon,
  ArrowRightIcon,
  BellIcon,
  EyeIcon,
  StarIcon,
} from "@/components/Icons";
import {
  students,
  doctors,
  appointments,
  schools,
  messages,
  notifications,
  statusColors,
  statusLabels,
  formatDate,
} from "@/data/mockData";

type Tab = "overview" | "alunos" | "medicos" | "relatorios";

const SCHOOL_NAME = "Colegio Santo Agostinho";

export default function SchoolDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");

  // Filter data for this school
  const schoolStudents = students.filter((s) => s.school === SCHOOL_NAME);
  const schoolStudentIds = schoolStudents.map((s) => s.id);
  const schoolAppointments = appointments.filter((a) =>
    schoolStudentIds.includes(a.studentId)
  );

  // KPI calculations
  const totalAlunos = schoolStudents.length;
  const medicosDisponiveis = doctors.length;
  const consultasEsteMes = schoolAppointments.filter((a) =>
    a.date.startsWith("2026-04")
  ).length;
  const alertasAtivos =
    messages.filter((m) => m.urgent && !m.read).length +
    notifications.filter((n) => n.type === "alerta" && !n.read).length;

  // Grades for filter
  const allGrades = Array.from(new Set(schoolStudents.map((s) => s.grade))).sort();

  // Filtered students for Alunos tab
  const filteredStudents = schoolStudents.filter((s) => {
    const matchesSearch = s.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === "all" || s.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  // Last consultation date per student
  const lastConsultationMap: Record<number, string> = {};
  schoolAppointments
    .filter((a) => a.status === "concluida")
    .sort((a, b) => b.date.localeCompare(a.date))
    .forEach((a) => {
      if (!lastConsultationMap[a.studentId]) {
        lastConsultationMap[a.studentId] = a.date;
      }
    });

  // Overview data
  const recentAppointments = [...schoolAppointments]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const urgentMessages = messages.filter((m) => m.urgent);
  const alertNotifications = notifications.filter(
    (n) => n.type === "alerta"
  );

  // Consultation type breakdown
  const teleconsultaCount = schoolAppointments.filter(
    (a) => a.type === "teleconsulta"
  ).length;
  const presencialCount = schoolAppointments.filter(
    (a) => a.type === "presencial"
  ).length;

  // Status breakdown
  const statusBreakdown = {
    agendada: schoolAppointments.filter((a) => a.status === "agendada").length,
    "em-andamento": schoolAppointments.filter(
      (a) => a.status === "em-andamento"
    ).length,
    concluida: schoolAppointments.filter((a) => a.status === "concluida")
      .length,
    cancelada: schoolAppointments.filter((a) => a.status === "cancelada")
      .length,
  };

  // Relatorios data - monthly consultation counts
  const monthlyData = [
    { month: "Jan", count: 18 },
    { month: "Fev", count: 22 },
    { month: "Mar", count: 15 },
    { month: "Abr", count: consultasEsteMes },
  ];
  const maxMonthly = Math.max(...monthlyData.map((d) => d.count));

  // Consultations by specialty
  const specialtyBreakdown: Record<string, number> = {};
  schoolAppointments.forEach((a) => {
    specialtyBreakdown[a.doctorSpecialty] =
      (specialtyBreakdown[a.doctorSpecialty] || 0) + 1;
  });

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Visao Geral" },
    { key: "alunos", label: "Alunos" },
    { key: "medicos", label: "Medicos" },
    { key: "relatorios", label: "Relatorios" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role="school" />
      <div className="page-container flex-1">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <BuildingIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="page-title">{SCHOOL_NAME}</h1>
              <p className="page-subtitle">Painel de Saude Escolar</p>
            </div>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                Total Alunos
              </span>
              <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-primary-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalAlunos}</p>
            <p className="text-xs text-gray-400 mt-1">Matriculados nesta escola</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                Medicos Disponiveis
              </span>
              <div className="w-9 h-9 rounded-lg bg-secondary-50 flex items-center justify-center">
                <StethoscopeIcon className="w-5 h-5 text-secondary-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {medicosDisponiveis}
            </p>
            <p className="text-xs text-gray-400 mt-1">Especialistas cadastrados</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                Consultas Este Mes
              </span>
              <div className="w-9 h-9 rounded-lg bg-accent-50 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-accent-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {consultasEsteMes}
            </p>
            <p className="text-xs text-gray-400 mt-1">Abril 2026</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                Alertas Ativos
              </span>
              <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                <AlertIcon className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{alertasAtivos}</p>
            <p className="text-xs text-gray-400 mt-1">Requerem atencao</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== VISAO GERAL TAB ===== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Appointments */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    Consultas Recentes
                  </h3>
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  {recentAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {apt.studentName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {apt.doctorName} &middot; {formatDate(apt.date)} as{" "}
                          {apt.time}
                        </p>
                      </div>
                      <span className={statusColors[apt.status]}>
                        {statusLabels[apt.status]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Alerts */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    Alertas de Saude
                  </h3>
                  <BellIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  {urgentMessages.length > 0 ? (
                    urgentMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-3 rounded-xl bg-red-50 border border-red-100"
                      >
                        <div className="flex items-start gap-2">
                          <AlertIcon className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-red-800">
                              {msg.subject}
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                              {msg.content}
                            </p>
                            <p className="text-xs text-red-400 mt-1">
                              {msg.senderName} &middot; {msg.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : null}
                  {alertNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 rounded-xl bg-amber-50 border border-amber-100"
                    >
                      <div className="flex items-start gap-2">
                        <AlertIcon className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-amber-800">
                            {notif.title}
                          </p>
                          <p className="text-xs text-amber-600 mt-1">
                            {notif.description}
                          </p>
                          <p className="text-xs text-amber-400 mt-1">
                            {notif.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {urgentMessages.length === 0 &&
                    alertNotifications.length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-4">
                        Nenhum alerta ativo no momento.
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Consultation Types */}
              <div className="card p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Tipos de Consulta
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">
                        Teleconsulta
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {teleconsultaCount}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-primary-500 h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            schoolAppointments.length > 0
                              ? (teleconsultaCount /
                                  schoolAppointments.length) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Presencial</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {presencialCount}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-secondary-500 h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            schoolAppointments.length > 0
                              ? (presencialCount /
                                  schoolAppointments.length) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="card p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Status das Consultas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-green-50 text-center">
                    <p className="text-xl font-bold text-green-700">
                      {statusBreakdown.agendada}
                    </p>
                    <p className="text-xs text-green-600 mt-1">Agendadas</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50 text-center">
                    <p className="text-xl font-bold text-purple-700">
                      {statusBreakdown["em-andamento"]}
                    </p>
                    <p className="text-xs text-purple-600 mt-1">Em Andamento</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 text-center">
                    <p className="text-xl font-bold text-blue-700">
                      {statusBreakdown.concluida}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">Concluidas</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-50 text-center">
                    <p className="text-xl font-bold text-red-700">
                      {statusBreakdown.cancelada}
                    </p>
                    <p className="text-xs text-red-600 mt-1">Canceladas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ALUNOS TAB ===== */}
        {activeTab === "alunos" && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="card p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar aluno por nome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="filter-input w-full pl-9"
                  />
                </div>
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Todas as Series</option>
                  {allGrades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
                <button className="gradient-btn-sm">
                  <DownloadIcon className="w-4 h-4" />
                  Exportar CSV
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Aluno</th>
                      <th>Serie</th>
                      <th>Idade</th>
                      <th>Tipo Sanguineo</th>
                      <th>Alergias</th>
                      <th>Condicoes</th>
                      <th>Ultima Consulta</th>
                      <th>Acoes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <Image
                              src={student.image}
                              alt={student.name}
                              width={32}
                              height={32}
                              className="rounded-full object-cover"
                            />
                            <span className="font-medium text-gray-900">
                              {student.name}
                            </span>
                          </div>
                        </td>
                        <td>{student.grade}</td>
                        <td>{student.age} anos</td>
                        <td>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                            {student.bloodType}
                          </span>
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-1">
                            {student.allergies.length > 0 ? (
                              student.allergies.map((allergy) => (
                                <span
                                  key={allergy}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700"
                                >
                                  {allergy}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400">
                                Nenhuma
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-1">
                            {student.conditions.length > 0 ? (
                              student.conditions.map((condition) => (
                                <span
                                  key={condition}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700"
                                >
                                  {condition}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400">
                                Nenhuma
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          {lastConsultationMap[student.id] ? (
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <ClockIcon className="w-3.5 h-3.5" />
                              {formatDate(lastConsultationMap[student.id])}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">
                              Sem registro
                            </span>
                          )}
                        </td>
                        <td>
                          <Link
                            href={`/students/${student.id}`}
                            className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-xs font-medium"
                          >
                            <EyeIcon className="w-3.5 h-3.5" />
                            Ver Perfil
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-400">
                  Nenhum aluno encontrado com os filtros selecionados.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== MEDICOS TAB ===== */}
        {activeTab === "medicos" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {doctors.map((doctor) => {
              const doctorConsultations = schoolAppointments.filter(
                (a) => a.doctorId === doctor.id
              ).length;
              return (
                <div key={doctor.id} className="card p-6">
                  <div className="flex items-start gap-4">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={64}
                      height={64}
                      className="rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {doctor.specialty}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {doctor.crm}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(doctor.rating)
                                ? "text-accent-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                        <span className="text-xs font-medium text-gray-600 ml-1">
                          {doctor.rating}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <CheckIcon className="w-3.5 h-3.5 text-secondary-500" />
                          <span>
                            {doctor.totalConsultations} consultas totais
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <ClockIcon className="w-3.5 h-3.5 text-primary-500" />
                          <span>
                            {doctor.availableSlots.length} horarios livres
                          </span>
                        </div>
                      </div>

                      {/* School-specific consultations */}
                      <div className="mt-3 text-xs text-gray-500">
                        <span className="font-medium text-gray-700">
                          {doctorConsultations}
                        </span>{" "}
                        consultas nesta escola
                      </div>

                      {/* Action */}
                      <Link
                        href="/appointments"
                        className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        Agendar Consulta
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===== RELATORIOS TAB ===== */}
        {activeTab === "relatorios" && (
          <div className="space-y-6">
            {/* Monthly Bar Chart */}
            <div className="card p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Total de Consultas por Mes
              </h3>
              <div className="flex items-end gap-6 h-48">
                {monthlyData.map((item) => (
                  <div
                    key={item.month}
                    className="flex flex-col items-center flex-1"
                  >
                    <span className="text-sm font-semibold text-gray-700 mb-2">
                      {item.count}
                    </span>
                    <div
                      className="w-full max-w-[60px] bg-gradient-primary rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${
                          maxMonthly > 0
                            ? (item.count / maxMonthly) * 140
                            : 0
                        }px`,
                      }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Consultations by Type */}
              <div className="card p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Consultas por Tipo
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-primary-50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary-500" />
                      <span className="text-sm text-gray-700">
                        Teleconsulta
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {teleconsultaCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary-50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary-500" />
                      <span className="text-sm text-gray-700">Presencial</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {presencialCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Consultations by Specialty */}
              <div className="card p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Consultas por Especialidade
                </h3>
                <div className="space-y-3">
                  {Object.entries(specialtyBreakdown).map(
                    ([specialty, count]) => (
                      <div key={specialty}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">
                            {specialty}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {count}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${
                                schoolAppointments.length > 0
                                  ? (count / schoolAppointments.length) * 100
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Generate Report Button */}
            <div className="flex justify-end">
              <button className="gradient-btn">
                <DownloadIcon className="w-5 h-5" />
                Gerar Relatorio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
