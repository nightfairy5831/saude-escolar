"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CalendarIcon,
  ClockIcon,
  VideoIcon,
  UserIcon,
  SearchIcon,
  FilterIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  MapPinIcon,
} from "@/components/Icons";
import {
  appointments,
  doctors,
  students,
  statusColors,
  statusLabels,
  formatDate,
  specialties,
} from "@/data/mockData";

export default function AppointmentsPage() {
  const [activeView, setActiveView] = useState<"list" | "schedule">("list");
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [expandedAppointment, setExpandedAppointment] = useState<number | null>(null);
  const [scheduled, setScheduled] = useState(false);
  const [step, setStep] = useState(1);

  const filteredAppointments = appointments.filter((apt) => {
    if (filterStatus && apt.status !== filterStatus) return false;
    if (filterType && apt.type !== filterType) return false;
    return true;
  });

  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor);

  const handleSchedule = () => {
    if (selectedStudent && selectedDoctor && selectedDate && selectedTime && reason.trim()) {
      setScheduled(true);
    }
  };

  const resetSchedule = () => {
    setSelectedStudent(null);
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
    setReason("");
    setScheduled(false);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container-max px-4 md:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Consultas M&apos;edicas
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gerencie suas consultas ou agende um novo atendimento com nossos especialistas
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => { setActiveView("list"); resetSchedule(); }}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeView === "list"
                  ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              Minhas Consultas
            </button>
            <button
              onClick={() => { setActiveView("schedule"); resetSchedule(); }}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeView === "schedule"
                  ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              Agendar Nova
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-max">
          {/* ===== LIST VIEW ===== */}
          {activeView === "list" && (
            <div>
              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2">
                  <FilterIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Filtros:</span>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Todos os status</option>
                  <option value="agendada">Agendada</option>
                  <option value="em-andamento">Em Andamento</option>
                  <option value="concluida">Concluida</option>
                  <option value="cancelada">Cancelada</option>
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Todos os tipos</option>
                  <option value="teleconsulta">Teleconsulta</option>
                  <option value="presencial">Presencial</option>
                </select>
              </div>

              {/* Appointment cards */}
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-16">
                  <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Nenhuma consulta encontrada</p>
                  <p className="text-sm text-gray-400 mt-1">Tente ajustar os filtros ou agende uma nova consulta</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="card p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          {/* Student name */}
                          <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-primary-500" />
                            <span className="font-semibold text-gray-900">{apt.studentName}</span>
                          </div>

                          {/* Doctor info */}
                          <p className="text-sm text-gray-600">
                            {apt.doctorName} &mdash; {apt.doctorSpecialty}
                          </p>

                          {/* Date and time */}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <CalendarIcon className="w-4 h-4" />
                              {formatDate(apt.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <ClockIcon className="w-4 h-4" />
                              {apt.time}
                            </span>
                          </div>

                          {/* Reason */}
                          <p className="text-sm text-gray-500 italic">{apt.reason}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          {/* Type badge */}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {apt.type === "teleconsulta" ? (
                              <VideoIcon className="w-3.5 h-3.5" />
                            ) : (
                              <MapPinIcon className="w-3.5 h-3.5" />
                            )}
                            {apt.type === "teleconsulta" ? "Teleconsulta" : "Presencial"}
                          </span>

                          {/* Status badge */}
                          <span className={statusColors[apt.status]}>
                            {statusLabels[apt.status]}
                          </span>

                          {/* Expand notes for completed */}
                          {apt.status === "concluida" && apt.notes && (
                            <button
                              onClick={() =>
                                setExpandedAppointment(
                                  expandedAppointment === apt.id ? null : apt.id
                                )
                              }
                              className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                            >
                              {expandedAppointment === apt.id ? "Ocultar notas" : "Ver notas"}
                              <ArrowRightIcon
                                className={`w-3 h-3 transition-transform duration-200 ${
                                  expandedAppointment === apt.id ? "rotate-90" : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expanded notes */}
                      {expandedAppointment === apt.id && apt.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm font-medium text-gray-700 mb-1">Notas da consulta:</p>
                          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                            {apt.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== SCHEDULE VIEW ===== */}
          {activeView === "schedule" && (
            <div>
              {scheduled ? (
                /* Success message */
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-6">
                    <CheckIcon className="w-8 h-8 text-secondary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Consulta Agendada com Sucesso!
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {selectedDoctorData?.name} &mdash; {formatDate(selectedDate)} as {selectedTime}
                  </p>
                  <p className="text-sm text-gray-500 mb-8">
                    Voce recebera uma confirmacao por email com todos os detalhes.
                  </p>
                  <button onClick={resetSchedule} className="gradient-btn">
                    Agendar Outra Consulta
                  </button>
                </div>
              ) : (
                <div>
                  {/* Step indicators */}
                  <div className="flex items-center justify-center gap-2 mb-10">
                    {[1, 2, 3, 4].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                            step >= s
                              ? "bg-gradient-primary text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step > s ? <CheckIcon className="w-4 h-4" /> : s}
                        </div>
                        {s < 4 && (
                          <div
                            className={`w-12 md:w-20 h-0.5 ${
                              step > s ? "bg-primary-500" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step 1: Select student */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Selecione o aluno
                      </h2>
                      <p className="text-sm text-gray-500 mb-6">
                        Escolha para qual aluno deseja agendar a consulta
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {students.map((student) => (
                          <button
                            key={student.id}
                            onClick={() => {
                              setSelectedStudent(student.id);
                              setStep(2);
                            }}
                            className={`card p-5 text-left hover:shadow-md transition-all duration-300 cursor-pointer ${
                              selectedStudent === student.id
                                ? "ring-2 ring-primary-500 border-primary-500"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
                                <Image
                                  src={student.image}
                                  alt={student.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{student.name}</p>
                                <p className="text-xs text-gray-500">
                                  {student.age} anos &mdash; {student.grade}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400">{student.school}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Select doctor */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Selecione o medico
                      </h2>
                      <p className="text-sm text-gray-500 mb-6">
                        Escolha o especialista para a consulta
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {doctors.map((doctor) => (
                          <button
                            key={doctor.id}
                            onClick={() => {
                              setSelectedDoctor(doctor.id);
                              setStep(3);
                            }}
                            className={`card p-5 text-left hover:shadow-md transition-all duration-300 cursor-pointer ${
                              selectedDoctor === doctor.id
                                ? "ring-2 ring-primary-500 border-primary-500"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full overflow-hidden relative flex-shrink-0">
                                <Image
                                  src={doctor.image}
                                  alt={doctor.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{doctor.name}</p>
                                <p className="text-sm text-gray-500">{doctor.specialty}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <StarIcon
                                        key={i}
                                        className={`w-3.5 h-3.5 ${
                                          i < Math.floor(doctor.rating)
                                            ? "text-accent-400"
                                            : "text-gray-200"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500">{doctor.rating}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">{doctor.crm}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="mt-6 text-sm text-gray-500 hover:text-gray-700 font-medium"
                      >
                        &larr; Voltar
                      </button>
                    </div>
                  )}

                  {/* Step 3: Select date and time */}
                  {step === 3 && selectedDoctorData && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Escolha data e horario
                      </h2>
                      <p className="text-sm text-gray-500 mb-6">
                        Horarios disponiveis de {selectedDoctorData.name}
                      </p>

                      <div className="card p-6 mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data da consulta
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="filter-input w-full md:w-auto"
                          min="2026-04-01"
                        />
                      </div>

                      {selectedDate && (
                        <div className="card p-6">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Horario disponivel
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                            {selectedDoctorData.availableSlots.map((slot) => (
                              <button
                                key={slot}
                                onClick={() => {
                                  setSelectedTime(slot);
                                  setStep(4);
                                }}
                                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                                  selectedTime === slot
                                    ? "bg-gradient-primary text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                <ClockIcon className="w-3.5 h-3.5 inline mr-1" />
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => setStep(2)}
                        className="mt-6 text-sm text-gray-500 hover:text-gray-700 font-medium"
                      >
                        &larr; Voltar
                      </button>
                    </div>
                  )}

                  {/* Step 4: Reason and confirm */}
                  {step === 4 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Motivo da consulta
                      </h2>
                      <p className="text-sm text-gray-500 mb-6">
                        Descreva brevemente o motivo do agendamento
                      </p>

                      {/* Summary */}
                      <div className="card p-6 mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                          Resumo do agendamento
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>
                            <span className="font-medium text-gray-800">Aluno:</span>{" "}
                            {students.find((s) => s.id === selectedStudent)?.name}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">Medico:</span>{" "}
                            {selectedDoctorData?.name} &mdash; {selectedDoctorData?.specialty}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">Data:</span>{" "}
                            {formatDate(selectedDate)} as {selectedTime}
                          </p>
                        </div>
                      </div>

                      <div className="card p-6 mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motivo da consulta
                        </label>
                        <textarea
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          rows={4}
                          placeholder="Descreva os sintomas ou motivo da consulta..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setStep(3)}
                          className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                        >
                          &larr; Voltar
                        </button>
                        <button
                          onClick={handleSchedule}
                          disabled={!reason.trim()}
                          className={`gradient-btn ${
                            !reason.trim() ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <CheckIcon className="w-4 h-4" />
                          Confirmar Agendamento
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
