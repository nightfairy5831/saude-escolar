import Link from "next/link";
import { HeartIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <HeartIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SaudeEscolar</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">Telemedicina escolar conectando pais, medicos e escolas para o cuidado dos alunos.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li><Link href="/appointments" className="text-sm text-gray-400 hover:text-white transition-colors">Agendar Consulta</Link></li>
              <li><Link href="/messages" className="text-sm text-gray-400 hover:text-white transition-colors">Mensagens</Link></li>
              <li><Link href="/register" className="text-sm text-gray-400 hover:text-white transition-colors">Cadastre-se</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Portais</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard/parent" className="text-sm text-gray-400 hover:text-white transition-colors">Portal dos Pais</Link></li>
              <li><Link href="/dashboard/doctor" className="text-sm text-gray-400 hover:text-white transition-colors">Portal Medico</Link></li>
              <li><Link href="/dashboard/school" className="text-sm text-gray-400 hover:text-white transition-colors">Portal da Escola</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">contato@saudeescolar.com.br</li>
              <li className="text-sm text-gray-400">0800 123 4567</li>
              <li className="text-sm text-gray-400">Sao Paulo, Brasil</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">&copy; 2026 SaudeEscolar. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacidade (LGPD)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
