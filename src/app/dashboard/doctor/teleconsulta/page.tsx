"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import {
  VideoIcon,
  ClockIcon,
  UsersIcon,
  PhoneIcon,
  AlertIcon,
  CheckIcon,
  StethoscopeIcon,
  EyeIcon,
} from "@/components/Icons";
import {
  appointments,
  students,
  statusLabels,
  statusColors,
  formatDate,
} from "@/data/mockData";

export default function TeleconsultaPage() {
  const [activeCall, setActiveCall] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<
    (typeof appointments)[number] | null
  >(null);
  const [notes, setNotes] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const today = "2026-04-01";
  const doctorAppointments = appointments.filter((a) => a.doctorId === 1);
  const todayTeleconsultas = doctorAppointments.filter(
    (a) => a.date === today && a.type === "teleconsulta" && a.status !== "cancelada"
  );

  const handleStartCall = (appt: (typeof appointments)[number]) => {
    setSelectedAppointment(appt);
    setActiveCall(true);
    setNotes("");
  };

  const handleEndCall = () => {
    setActiveCall(false);
    setSelectedAppointment(null);
    setNotes("");
    setIsMuted(false);
    setIsVideoOn(true);
  };

  const selectedStudent = selectedAppointment
    ? students.find((s) => s.id === selectedAppointment.studentId)
    : null;

  return (
    <div className="flex">
      <Sidebar role="doctor" />
      <main className="page-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-title flex items-center gap-2">
            <VideoIcon className="w-7 h-7 text-primary-600" />
            Teleconsulta
          </h1>
          <p className="page-subtitle">
            Realize consultas por video com seus pacientes de forma segura e pratica.
          </p>
        </div>

        {!activeCall ? (
          /* ===== No Active Call: Show today&apos;s teleconsulta list ===== */
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-primary-600" />
              Teleconsultas de Hoje
            </h2>

            {todayTeleconsultas.length === 0 ? (
              <div className="card p-8 text-center">
                <VideoIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  Nenhuma teleconsulta agendada para hoje.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayTeleconsultas.map((appt) => {
                  const student = students.find((s) => s.id === appt.studentId);
                  return (
                    <div key={appt.id} className="card p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                            <UsersIcon className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{appt.studentName}</p>
                            <p className="text-sm text-gray-500">{appt.reason}</p>
                            {student && (
                              <p className="text-xs text-gray-400 mt-1">
                                {student.age} anos &middot; {student.school}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <ClockIcon className="w-4 h-4 text-gray-400" />
                            {appt.time}
                          </span>
                          <span className={statusColors[appt.status]}>
                            {statusLabels[appt.status]}
                          </span>
                          {appt.status === "agendada" && (
                            <button
                              onClick={() => handleStartCall(appt)}
                              className="gradient-btn-sm"
                            >
                              <VideoIcon className="w-4 h-4" />
                              Iniciar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ===== Active Call: Video call interface ===== */
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Video Area */}
              <div className="lg:col-span-2">
                <div className="card overflow-hidden">
                  <div className="bg-gradient-dark aspect-video flex flex-col items-center justify-center rounded-t-2xl">
                    <VideoIcon className="w-16 h-16 text-white/40 mb-4" />
                    <p className="text-white/60 text-lg font-medium">Conectando...</p>
                    <p className="text-white/40 text-sm mt-1">
                      Aguardando paciente entrar na sala
                    </p>
                  </div>

                  {/* Controls Bar */}
                  <div className="flex items-center justify-center gap-4 p-4 bg-white border-t border-gray-100">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isMuted
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      title={isMuted ? "Ativar microfone" : "Desativar microfone"}
                    >
                      <PhoneIcon className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                        !isVideoOn
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      title={isVideoOn ? "Desativar video" : "Ativar video"}
                    >
                      <VideoIcon className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleEndCall}
                      className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all duration-200"
                      title="Encerrar chamada"
                    >
                      <PhoneIcon className="w-5 h-5" />
                    </button>

                    <button
                      className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-all duration-200"
                      title="Compartilhar tela"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Patient Info Sidebar */}
              <div className="lg:col-span-1">
                <div className="card p-5 h-full">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <StethoscopeIcon className="w-5 h-5 text-primary-600" />
                    Dados do Paciente
                  </h3>

                  {selectedStudent && selectedAppointment && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <UsersIcon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {selectedStudent.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {selectedStudent.age} anos
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4 space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Alergias
                          </p>
                          {selectedStudent.allergies.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {selectedStudent.allergies.map((allergy) => (
                                <span
                                  key={allergy}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700"
                                >
                                  <AlertIcon className="w-3 h-3 mr-1" />
                                  {allergy}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400">Nenhuma alergia registrada</p>
                          )}
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Condicoes
                          </p>
                          {selectedStudent.conditions.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {selectedStudent.conditions.map((condition) => (
                                <span
                                  key={condition}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-700"
                                >
                                  {condition}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400">
                              Nenhuma condicao registrada
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Motivo da Consulta
                          </p>
                          <p className="text-sm text-gray-700">
                            {selectedAppointment.reason}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Escola
                          </p>
                          <p className="text-sm text-gray-700">{selectedStudent.school}</p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Tipo Sanguineo
                          </p>
                          <p className="text-sm text-gray-700">
                            {selectedStudent.bloodType}
                          </p>
                        </div>

                        {selectedStudent.medications.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                              Medicamentos em Uso
                            </p>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {selectedStudent.medications.map((med) => (
                                <li key={med} className="flex items-center gap-1">
                                  <CheckIcon className="w-3 h-3 text-secondary-500" />
                                  {med}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notes Area */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <StethoscopeIcon className="w-5 h-5 text-primary-600" />
                Anotacoes da Consulta
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Registre suas observacoes durante a consulta..."
                className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins resize-none"
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleEndCall}
                  className="gradient-btn"
                >
                  <CheckIcon className="w-5 h-5" />
                  Finalizar e Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
