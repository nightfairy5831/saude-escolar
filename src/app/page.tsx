import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  HeartIcon,
  VideoIcon,
  CalendarIcon,
  UsersIcon,
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  BellIcon,
  MessageIcon,
  UserIcon,
  StethoscopeIcon,
  FileIcon,
  BuildingIcon,
} from "@/components/Icons";
import { platformStats, testimonials } from "@/data/mockData";

export default function Home() {
  const portals = [
    {
      icon: <UsersIcon className="w-8 h-8" />,
      title: "Portal dos Pais",
      description:
        "Acompanhe a saude dos seus filhos de qualquer lugar com acesso completo ao historico medico e comunicacao direta.",
      features: [
        "Agendar consultas e teleconsultas",
        "Historico medico completo dos filhos",
        "Comunicacao direta com medicos e escola",
      ],
      gradient: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      link: "/dashboard/parent",
    },
    {
      icon: <StethoscopeIcon className="w-8 h-8" />,
      title: "Portal Medico",
      description:
        "Atenda alunos por teleconsulta com acesso a prontuarios digitais e ferramentas de gestao da sua agenda.",
      features: [
        "Teleconsulta integrada com video",
        "Prontuario eletronico completo",
        "Gestao inteligente de agenda",
      ],
      gradient: "from-emerald-500 to-emerald-600",
      bgLight: "bg-emerald-50",
      link: "/dashboard/doctor",
    },
    {
      icon: <BuildingIcon className="w-8 h-8" />,
      title: "Portal da Escola",
      description:
        "Gerencie a saude escolar com relatorios detalhados, alertas de emergencia e visao geral dos alunos.",
      features: [
        "Gestao centralizada de saude escolar",
        "Relatorios e dashboards detalhados",
        "Protocolo de emergencias integrado",
      ],
      gradient: "from-amber-500 to-amber-600",
      bgLight: "bg-amber-50",
      link: "/dashboard/school",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Cadastro",
      description:
        "Escola, pais ou medicos se cadastram na plataforma em poucos minutos com validacao segura.",
    },
    {
      number: "2",
      title: "Agendamento",
      description:
        "Pais agendam consultas ou teleconsultas com medicos disponiveis diretamente pela plataforma.",
    },
    {
      number: "3",
      title: "Teleconsulta",
      description:
        "Consulta por video com qualidade profissional, com acesso ao prontuario digital do aluno.",
    },
    {
      number: "4",
      title: "Acompanhamento",
      description:
        "Historico completo, prescricoes e comunicacao continua entre pais, medicos e escola.",
    },
  ];

  const features = [
    {
      icon: <VideoIcon className="w-7 h-7" />,
      title: "Teleconsulta",
      description:
        "Consultas por video com qualidade HD, gravacao segura e compartilhamento de tela para exames.",
    },
    {
      icon: <CalendarIcon className="w-7 h-7" />,
      title: "Agendamento Inteligente",
      description:
        "Agende consultas em segundos com sugestoes automaticas de horarios e lembretes integrados.",
    },
    {
      icon: <FileIcon className="w-7 h-7" />,
      title: "Prontuario Digital",
      description:
        "Historico medico completo do aluno acessivel de forma segura por pais, medicos e escola.",
    },
    {
      icon: <BellIcon className="w-7 h-7" />,
      title: "Notificacoes",
      description:
        "Alertas em tempo real sobre consultas, resultados, campanhas de vacinacao e emergencias.",
    },
    {
      icon: <MessageIcon className="w-7 h-7" />,
      title: "Comunicacao",
      description:
        "Canal seguro de mensagens entre pais, medicos e coordenacao escolar com historico completo.",
    },
    {
      icon: <ShieldIcon className="w-7 h-7" />,
      title: "Seguranca LGPD",
      description:
        "Dados protegidos com criptografia de ponta a ponta em conformidade total com a LGPD.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-24 pb-16 md:pb-24 bg-gradient-hero overflow-hidden">
        {/* Blur circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/3 w-64 h-64 bg-accent-300/20 rounded-full blur-3xl" />

        <div className="container-max px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
            {/* Left content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-100 shadow-sm">
                  <HeartIcon className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-medium text-primary-700">
                    Telemedicina Escolar
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Saude Escolar ao{" "}
                  <span className="gradient-text">Alcance de um Clique</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                  A plataforma de telemedicina que conecta pais, medicos e
                  escolas particulares para garantir o cuidado integral da saude
                  dos alunos com praticidade e seguranca.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/appointments" className="gradient-btn">
                  Agendar Consulta
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link href="#features" className="gradient-btn-outline">
                  Conhecer Plataforma
                </Link>
              </div>
            </div>

            {/* Right image with floating stats */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop"
                  alt="Medico atendendo paciente por telemedicina"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating stat: Alunos */}
              <div className="absolute -left-4 top-8 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">12.5K+</p>
                  <p className="text-xs text-gray-500">Alunos</p>
                </div>
              </div>

              {/* Floating stat: Consultas */}
              <div className="absolute -right-4 top-1/3 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                  <VideoIcon className="w-5 h-5 text-secondary-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">45K+</p>
                  <p className="text-xs text-gray-500">Consultas</p>
                </div>
              </div>

              {/* Floating stat: Satisfacao */}
              <div className="absolute -bottom-4 left-1/4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                  <StarIcon className="w-5 h-5 text-accent-500" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">98%</p>
                  <p className="text-xs text-gray-500">Satisfacao</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-gradient-dark py-12">
        <div className="container-max px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-white/80 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3 PORTALS ===== */}
      <section id="features" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Uma Plataforma para{" "}
              <span className="gradient-text">Todos</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              Tres portais integrados para atender as necessidades de cada
              usuario com funcionalidades especificas e experiencia
              personalizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portals.map((portal, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${portal.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {portal.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {portal.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {portal.description}
                </p>
                <ul className="space-y-3">
                  {portal.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={portal.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 mt-6 hover:text-primary-700 transition-colors"
                >
                  Acessar Portal
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Como <span className="gradient-text">Funciona</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              Em quatro passos simples, voce conecta a saude do seu filho com os
              melhores profissionais diretamente pela escola.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300" />
                )}
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg shadow-primary-500/25">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Recursos que Fazem a{" "}
              <span className="gradient-text">Diferenca</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              Tecnologia de ponta a servico da saude escolar com funcionalidades
              pensadas para cada detalhe do cuidado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              O que Dizem Sobre a{" "}
              <span className="gradient-text">SaudeEscolar</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              Depoimentos de pais, medicos e escolas que ja transformaram o
              cuidado com a saude escolar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative"
              >
                {/* Quote SVG */}
                <svg
                  className="w-10 h-10 text-primary-200 mb-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-gradient-dark py-20 relative overflow-hidden">
        {/* Decorative blur circles */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="container-max px-4 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para Cuidar da Saude dos{" "}
            <span className="text-secondary-300">Seus Alunos</span>?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
            Junte-se a mais de 45 escolas que ja transformaram o cuidado com a
            saude escolar. Comece agora e veja a diferenca.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-primary-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2 shadow-lg"
            >
              Comecar Agora
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/appointments"
              className="border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2"
            >
              Agendar uma Consulta
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
