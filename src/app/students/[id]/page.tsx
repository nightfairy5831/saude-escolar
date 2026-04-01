import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CheckIcon,
  CalendarIcon,
  PhoneIcon,
  MessageIcon,
  UserIcon,
  HeartIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import {
  students,
  appointments,
  formatDate,
  statusLabels,
  statusColors,
} from "@/data/mockData";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return students.map((student) => ({
    id: String(student.id),
  }));
}

export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studentId = parseInt(id, 10);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    notFound();
  }

  const studentAppointments = appointments
    .filter((a) => a.studentId === studentId)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50/50 pt-24 pb-16">
        <div className="container-max px-4 md:px-8">
          {/* Header */}
          <div className="card p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src={student.image}
                  alt={student.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="page-title">{student.name}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {student.age} anos &middot; {student.grade} &middot;{" "}
                  {student.school}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Parent Info */}
              <div className="card p-5">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Responsavel
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <UserIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      {student.parentName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      {student.parentPhone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      {student.parentEmail}
                    </span>
                  </div>
                </div>
              </div>

              {/* Medical Info */}
              <div className="card p-5">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Informacoes Medicas
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tipo Sanguineo</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-50 text-red-700">
                      <HeartIcon className="w-3.5 h-3.5 mr-1" />
                      {student.bloodType}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Alergias</p>
                    {student.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {student.allergies.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">Nenhuma registrada</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Condicoes</p>
                    {student.conditions.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {student.conditions.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">Nenhuma registrada</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Medicamentos</p>
                    {student.medications.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {student.medications.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">Nenhum registrado</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Vaccination Record */}
              <div className="card p-5">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Carteira de Vacinacao
                </h2>
                <ul className="space-y-2.5">
                  {student.vaccinations.map((vaccine) => (
                    <li key={vaccine} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-3 h-3 text-secondary-600" />
                      </div>
                      <span className="text-sm text-gray-700">{vaccine}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Appointment History */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Historico de Consultas
                  </h2>
                </div>
                {studentAppointments.length === 0 ? (
                  <div className="p-8 text-center text-sm text-gray-500">
                    Nenhuma consulta encontrada para este aluno.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Medico</th>
                          <th>Especialidade</th>
                          <th>Tipo</th>
                          <th>Status</th>
                          <th>Motivo</th>
                          <th>Observacoes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentAppointments.map((appt) => (
                          <tr key={appt.id}>
                            <td className="whitespace-nowrap">
                              {formatDate(appt.date)}
                            </td>
                            <td className="whitespace-nowrap">
                              {appt.doctorName}
                            </td>
                            <td className="whitespace-nowrap">
                              {appt.doctorSpecialty}
                            </td>
                            <td>
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
                            </td>
                            <td>
                              <span className={statusColors[appt.status]}>
                                {statusLabels[appt.status]}
                              </span>
                            </td>
                            <td className="max-w-[200px]">{appt.reason}</td>
                            <td className="max-w-[200px] text-gray-500">
                              {appt.notes || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="mt-6 text-center">
                <Link href="/appointments" className="gradient-btn">
                  <CalendarIcon className="w-5 h-5" />
                  Agendar Nova Consulta
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
