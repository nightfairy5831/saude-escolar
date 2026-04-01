// ===== TYPES =====
export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  school: string;
  parentId: number;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  vaccinations: string[];
  image: string;
}

export interface Doctor {
  id: number;
  name: string;
  email: string;
  specialty: string;
  crm: string;
  image: string;
  rating: number;
  totalConsultations: number;
  availableSlots: string[];
}

export interface Appointment {
  id: number;
  studentId: number;
  studentName: string;
  doctorId: number;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  type: "teleconsulta" | "presencial";
  status: "agendada" | "em-andamento" | "concluida" | "cancelada";
  reason: string;
  notes: string;
  parentId: number;
}

export interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderRole: "pai" | "medico" | "escola";
  receiverId: number;
  receiverName: string;
  receiverRole: "pai" | "medico" | "escola";
  subject: string;
  content: string;
  date: string;
  read: boolean;
  urgent: boolean;
}

export interface Notification {
  id: number;
  type: "agendamento" | "lembrete" | "resultado" | "mensagem" | "alerta";
  title: string;
  description: string;
  date: string;
  read: boolean;
}

export interface School {
  id: number;
  name: string;
  totalStudents: number;
  totalDoctors: number;
  activeConsultations: number;
}

// ===== MOCK DATA =====
export const students: Student[] = [
  {
    id: 1, name: "Gabriel Silva", age: 10, grade: "5o Ano", school: "Colegio Santo Agostinho",
    parentId: 1, parentName: "Maria Silva", parentPhone: "(11) 99999-1234", parentEmail: "maria@email.com",
    bloodType: "O+", allergies: ["Penicilina", "Amendoim"], conditions: ["Asma leve"],
    medications: ["Bombinha inalatoria (uso eventual)"],
    vaccinations: ["COVID-19", "Gripe 2025", "Hepatite B", "Triplice viral", "Febre amarela"],
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=200&h=200&fit=crop",
  },
  {
    id: 2, name: "Sofia Santos", age: 8, grade: "3o Ano", school: "Colegio Santo Agostinho",
    parentId: 1, parentName: "Maria Silva", parentPhone: "(11) 99999-1234", parentEmail: "maria@email.com",
    bloodType: "A+", allergies: [], conditions: [],
    medications: [],
    vaccinations: ["COVID-19", "Gripe 2025", "Hepatite B", "Triplice viral"],
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop",
  },
  {
    id: 3, name: "Lucas Oliveira", age: 12, grade: "7o Ano", school: "Colegio Bandeirantes",
    parentId: 2, parentName: "Carlos Oliveira", parentPhone: "(11) 98888-5678", parentEmail: "carlos@email.com",
    bloodType: "B+", allergies: ["Lactose"], conditions: ["TDAH"],
    medications: ["Ritalina 10mg"],
    vaccinations: ["COVID-19", "Gripe 2025", "Hepatite B", "HPV"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
  },
  {
    id: 4, name: "Isabella Ferreira", age: 6, grade: "1o Ano", school: "Colegio Bandeirantes",
    parentId: 3, parentName: "Ana Ferreira", parentPhone: "(11) 97777-9012", parentEmail: "ana@email.com",
    bloodType: "AB+", allergies: ["Corante vermelho"], conditions: [],
    medications: [],
    vaccinations: ["COVID-19", "Gripe 2025", "Hepatite B", "Triplice viral", "Varicela"],
    image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=200&h=200&fit=crop",
  },
  {
    id: 5, name: "Pedro Costa", age: 14, grade: "9o Ano", school: "Colegio Santo Agostinho",
    parentId: 4, parentName: "Roberto Costa", parentPhone: "(11) 96666-3456", parentEmail: "roberto@email.com",
    bloodType: "O-", allergies: [], conditions: ["Miopia"],
    medications: [],
    vaccinations: ["COVID-19", "Gripe 2025", "Hepatite B", "HPV", "Meningite"],
    image: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=200&h=200&fit=crop",
  },
  {
    id: 6, name: "Valentina Lima", age: 9, grade: "4o Ano", school: "Colegio Dante Alighieri",
    parentId: 5, parentName: "Patricia Lima", parentPhone: "(11) 95555-7890", parentEmail: "patricia@email.com",
    bloodType: "A-", allergies: ["Dipirona"], conditions: ["Dermatite atopica"],
    medications: ["Creme hidratante prescrito"],
    vaccinations: ["COVID-19", "Gripe 2025", "Hepatite B", "Triplice viral"],
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=200&h=200&fit=crop",
  },
];

export const doctors: Doctor[] = [
  {
    id: 1, name: "Dra. Camila Rodrigues", email: "camila@medico.com", specialty: "Pediatria",
    crm: "CRM/SP 123456", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
    rating: 4.9, totalConsultations: 342,
    availableSlots: ["08:00", "08:30", "09:00", "09:30", "10:00", "14:00", "14:30", "15:00"],
  },
  {
    id: 2, name: "Dr. Fernando Almeida", email: "fernando@medico.com", specialty: "Clinica Geral",
    crm: "CRM/SP 789012", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
    rating: 4.7, totalConsultations: 528,
    availableSlots: ["10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"],
  },
  {
    id: 3, name: "Dra. Juliana Martins", email: "juliana@medico.com", specialty: "Dermatologia Pediatrica",
    crm: "CRM/SP 345678", image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=200&h=200&fit=crop",
    rating: 4.8, totalConsultations: 215,
    availableSlots: ["09:00", "09:30", "10:00", "10:30", "11:00"],
  },
  {
    id: 4, name: "Dr. Ricardo Nascimento", email: "ricardo@medico.com", specialty: "Psicologia Infantil",
    crm: "CRM/SP 901234", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop",
    rating: 4.9, totalConsultations: 189,
    availableSlots: ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
  },
];

export const appointments: Appointment[] = [
  { id: 1, studentId: 1, studentName: "Gabriel Silva", doctorId: 1, doctorName: "Dra. Camila Rodrigues", doctorSpecialty: "Pediatria", date: "2026-04-05", time: "09:00", type: "teleconsulta", status: "agendada", reason: "Tosse persistente ha 5 dias", notes: "", parentId: 1 },
  { id: 2, studentId: 3, studentName: "Lucas Oliveira", doctorId: 4, doctorName: "Dr. Ricardo Nascimento", doctorSpecialty: "Psicologia Infantil", date: "2026-04-03", time: "14:00", type: "teleconsulta", status: "concluida", reason: "Acompanhamento TDAH mensal", notes: "Evolucao positiva. Manter medicacao atual. Proximo retorno em 30 dias.", parentId: 2 },
  { id: 3, studentId: 6, studentName: "Valentina Lima", doctorId: 3, doctorName: "Dra. Juliana Martins", doctorSpecialty: "Dermatologia Pediatrica", date: "2026-04-07", time: "10:00", type: "presencial", status: "agendada", reason: "Avaliacao de dermatite — novas lesoes", notes: "", parentId: 5 },
  { id: 4, studentId: 2, studentName: "Sofia Santos", doctorId: 1, doctorName: "Dra. Camila Rodrigues", doctorSpecialty: "Pediatria", date: "2026-04-01", time: "08:30", type: "teleconsulta", status: "concluida", reason: "Febre e dor de garganta", notes: "Amigdalite bacteriana. Prescrito amoxicilina 250mg por 7 dias.", parentId: 1 },
  { id: 5, studentId: 5, studentName: "Pedro Costa", doctorId: 2, doctorName: "Dr. Fernando Almeida", doctorSpecialty: "Clinica Geral", date: "2026-04-08", time: "15:00", type: "teleconsulta", status: "agendada", reason: "Check-up semestral", notes: "", parentId: 4 },
  { id: 6, studentId: 1, studentName: "Gabriel Silva", doctorId: 2, doctorName: "Dr. Fernando Almeida", doctorSpecialty: "Clinica Geral", date: "2026-03-20", time: "10:00", type: "presencial", status: "concluida", reason: "Exame de rotina escolar", notes: "Aluno saudavel. Atestado emitido para pratica esportiva.", parentId: 1 },
  { id: 7, studentId: 4, studentName: "Isabella Ferreira", doctorId: 1, doctorName: "Dra. Camila Rodrigues", doctorSpecialty: "Pediatria", date: "2026-04-10", time: "09:30", type: "teleconsulta", status: "agendada", reason: "Dor abdominal recorrente", notes: "", parentId: 3 },
  { id: 8, studentId: 3, studentName: "Lucas Oliveira", doctorId: 2, doctorName: "Dr. Fernando Almeida", doctorSpecialty: "Clinica Geral", date: "2026-04-02", time: "14:30", type: "teleconsulta", status: "cancelada", reason: "Dor de cabeca frequente", notes: "Cancelado pelo responsavel", parentId: 2 },
];

export const messages: Message[] = [
  { id: 1, senderId: 1, senderName: "Maria Silva", senderRole: "pai", receiverId: 1, receiverName: "Dra. Camila Rodrigues", receiverRole: "medico", subject: "Duvida sobre medicacao do Gabriel", content: "Doutora, o Gabriel pode tomar o xarope junto com a bombinha? Ele esta com tosse desde segunda.", date: "2026-04-04 10:30", read: true, urgent: false },
  { id: 2, senderId: 1, senderName: "Dra. Camila Rodrigues", senderRole: "medico", receiverId: 1, receiverName: "Maria Silva", receiverRole: "pai", subject: "Re: Duvida sobre medicacao do Gabriel", content: "Ola Maria! Sim, pode usar os dois sem problema. O xarope ajuda na tosse e a bombinha na asma. Se piorar, me avise.", date: "2026-04-04 11:15", read: true, urgent: false },
  { id: 3, senderId: 100, senderName: "Colegio Santo Agostinho", senderRole: "escola", receiverId: 1, receiverName: "Maria Silva", receiverRole: "pai", subject: "Aviso: Campanha de vacinacao escolar", content: "Informamos que na proxima semana teremos campanha de vacinacao contra gripe na escola. Favor autorizar a participacao dos seus filhos.", date: "2026-04-03 08:00", read: false, urgent: false },
  { id: 4, senderId: 2, senderName: "Carlos Oliveira", senderRole: "pai", receiverId: 4, receiverName: "Dr. Ricardo Nascimento", receiverRole: "medico", subject: "Relatorio do Lucas para escola", content: "Doutor, a escola pediu um relatorio atualizado do acompanhamento do Lucas. O senhor pode preparar para a proxima consulta?", date: "2026-04-02 16:45", read: true, urgent: false },
  { id: 5, senderId: 100, senderName: "Colegio Bandeirantes", senderRole: "escola", receiverId: 2, receiverName: "Carlos Oliveira", receiverRole: "pai", subject: "URGENTE: Lucas passou mal na escola", content: "Sr. Carlos, o Lucas apresentou dor de cabeca forte e nausea durante a aula. Ja acionamos a enfermaria. Favor entrar em contato.", date: "2026-04-01 14:20", read: true, urgent: true },
  { id: 6, senderId: 3, senderName: "Dra. Juliana Martins", senderRole: "medico", receiverId: 5, receiverName: "Patricia Lima", receiverRole: "pai", subject: "Resultado dos exames da Valentina", content: "Patricia, os exames da Valentina chegaram e estao dentro da normalidade. Vamos discutir os detalhes na consulta de segunda.", date: "2026-04-03 09:30", read: false, urgent: false },
];

export const notifications: Notification[] = [
  { id: 1, type: "agendamento", title: "Consulta agendada", description: "Teleconsulta com Dra. Camila dia 05/04 as 09:00", date: "2026-04-04 08:00", read: false },
  { id: 2, type: "lembrete", title: "Lembrete de consulta", description: "Amanha: Teleconsulta do Gabriel as 09:00", date: "2026-04-04 18:00", read: false },
  { id: 3, type: "resultado", title: "Resultado disponivel", description: "Laudo da consulta de Sofia ja esta disponivel", date: "2026-04-01 17:00", read: true },
  { id: 4, type: "mensagem", title: "Nova mensagem", description: "Colegio Santo Agostinho enviou uma mensagem", date: "2026-04-03 08:05", read: false },
  { id: 5, type: "alerta", title: "Alerta de saude", description: "Surto de gripe reportado no Colegio Bandeirantes", date: "2026-04-02 10:00", read: true },
];

export const schools: School[] = [
  { id: 1, name: "Colegio Santo Agostinho", totalStudents: 1250, totalDoctors: 8, activeConsultations: 24 },
  { id: 2, name: "Colegio Bandeirantes", totalStudents: 980, totalDoctors: 6, activeConsultations: 18 },
  { id: 3, name: "Colegio Dante Alighieri", totalStudents: 1450, totalDoctors: 10, activeConsultations: 31 },
];

export const platformStats = [
  { label: "Alunos Atendidos", value: "12,500+", description: "Em escolas parceiras" },
  { label: "Teleconsultas Realizadas", value: "45,000+", description: "Com satisfacao de 98%" },
  { label: "Medicos Disponiveis", value: "85+", description: "Especialistas certificados" },
  { label: "Escolas Parceiras", value: "45+", description: "Em todo o Brasil" },
];

export const testimonials = [
  { name: "Maria Silva", role: "Mae de aluno — Colegio Santo Agostinho", avatar: "MS", text: "Com a SaudeEscolar, consigo agendar uma teleconsulta em minutos e acompanhar todo o historico medico dos meus filhos. A tranquilidade de saber que a escola tem suporte medico imediato nao tem preco." },
  { name: "Dra. Camila Rodrigues", role: "Pediatra — CRM/SP 123456", avatar: "CR", text: "A plataforma facilita enormemente o acompanhamento dos alunos. Tenho acesso ao historico completo e consigo me comunicar diretamente com pais e escola de forma segura." },
  { name: "Colegio Santo Agostinho", role: "Administracao Escolar", avatar: "SA", text: "Desde que implementamos a SaudeEscolar, o tempo de resposta para emergencias caiu 70%. Os pais estao mais tranquilos e nosso acompanhamento de saude e muito mais organizado." },
];

// ===== UTILITY FUNCTIONS =====
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
};

export const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr.replace(" ", "T"));
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
};

export const specialties = ["Pediatria", "Clinica Geral", "Dermatologia Pediatrica", "Psicologia Infantil"];

export const statusLabels: Record<string, string> = {
  "agendada": "Agendada",
  "em-andamento": "Em Andamento",
  "concluida": "Concluida",
  "cancelada": "Cancelada",
};

export const statusColors: Record<string, string> = {
  "agendada": "badge-confirmed",
  "em-andamento": "badge-in-progress",
  "concluida": "badge-completed",
  "cancelada": "badge-cancelled",
};
