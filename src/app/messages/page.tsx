"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MessageIcon,
  SearchIcon,
  FilterIcon,
  ArrowRightIcon,
  ClockIcon,
  AlertIcon,
  UserIcon,
  CheckIcon,
  PlusIcon,
} from "@/components/Icons";
import { messages, formatDateTime } from "@/data/mockData";

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newRecipient, setNewRecipient] = useState("");
  const [newContent, setNewContent] = useState("");
  const [replySent, setReplySent] = useState(false);

  const filteredMessages = messages.filter((msg) => {
    if (filterRole && msg.senderRole !== filterRole) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        msg.senderName.toLowerCase().includes(term) ||
        msg.subject.toLowerCase().includes(term) ||
        msg.content.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const selectedMsg = messages.find((m) => m.id === selectedMessage);

  // Find related messages (same subject thread)
  const threadMessages = selectedMsg
    ? messages.filter(
        (m) =>
          m.subject === selectedMsg.subject ||
          m.subject === `Re: ${selectedMsg.subject}` ||
          selectedMsg.subject === `Re: ${m.subject}`
      )
    : [];

  const handleSendReply = () => {
    if (newMessage.trim()) {
      setReplySent(true);
      setNewMessage("");
      setTimeout(() => setReplySent(false), 3000);
    }
  };

  const roleLabels: Record<string, string> = {
    pai: "Pai/Mae",
    medico: "Medico",
    escola: "Escola",
  };

  const roleBadgeColors: Record<string, string> = {
    pai: "bg-blue-100 text-blue-700",
    medico: "bg-green-100 text-green-700",
    escola: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container-max px-4 md:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Central de Mensagens
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comunique-se com medicos, escolas e demais responsaveis de forma segura
            </p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-6 border-b border-gray-200 bg-white">
        <div className="container-max px-4 md:px-8">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar mensagens..."
                className="filter-input w-full pl-9"
              />
            </div>

            {/* Role filter */}
            <div className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="filter-select"
              >
                <option value="">Todos os remetentes</option>
                <option value="pai">Pai/Mae</option>
                <option value="medico">Medico</option>
                <option value="escola">Escola</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main content: split layout */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex flex-col md:flex-row gap-6 min-h-[600px]">
            {/* Left sidebar: message list */}
            <div className="w-full md:w-1/3">
              <div className="card overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-700">
                    Mensagens ({filteredMessages.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-100 max-h-[520px] overflow-y-auto">
                  {filteredMessages.length === 0 ? (
                    <div className="p-8 text-center">
                      <MessageIcon className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">Nenhuma mensagem encontrada</p>
                    </div>
                  ) : (
                    filteredMessages.map((msg) => (
                      <button
                        key={msg.id}
                        onClick={() => {
                          setSelectedMessage(msg.id);
                          setReplySent(false);
                        }}
                        className={`w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                          selectedMessage === msg.id ? "bg-primary-50 border-l-4 border-primary-500" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Unread indicator */}
                          <div className="mt-1.5 flex-shrink-0">
                            {!msg.read ? (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                            ) : (
                              <div className="w-2.5 h-2.5" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className={`text-sm truncate ${!msg.read ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                                {msg.senderName}
                              </span>
                              {msg.urgent && (
                                <span className="flex-shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-700">
                                  <AlertIcon className="w-3 h-3" />
                                  Urgente
                                </span>
                              )}
                            </div>
                            <p className={`text-sm truncate ${!msg.read ? "font-medium text-gray-800" : "text-gray-600"}`}>
                              {msg.subject}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <ClockIcon className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-400">
                                {formatDateTime(msg.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right content: selected message detail */}
            <div className="w-full md:w-2/3">
              {selectedMsg ? (
                <div className="card h-full flex flex-col">
                  {/* Message header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h2 className="text-lg font-bold text-gray-900">{selectedMsg.subject}</h2>
                      {selectedMsg.urgent && (
                        <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          <AlertIcon className="w-3.5 h-3.5" />
                          Urgente
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {selectedMsg.senderName}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${roleBadgeColors[selectedMsg.senderRole]}`}>
                            {roleLabels[selectedMsg.senderRole]}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Para: {selectedMsg.receiverName} &mdash; {formatDateTime(selectedMsg.date)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Conversation thread */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {threadMessages
                      .sort((a, b) => new Date(a.date.replace(" ", "T")).getTime() - new Date(b.date.replace(" ", "T")).getTime())
                      .map((msg) => (
                        <div key={msg.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <UserIcon className="w-4 h-4 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-gray-800">
                                {msg.senderName}
                              </span>
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium ${roleBadgeColors[msg.senderRole]}`}>
                                {roleLabels[msg.senderRole]}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatDateTime(msg.date)}
                              </span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {msg.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                    {replySent && (
                      <div className="flex items-center gap-2 text-sm text-secondary-600 bg-secondary-50 rounded-lg p-3">
                        <CheckIcon className="w-4 h-4" />
                        Resposta enviada com sucesso!
                      </div>
                    )}
                  </div>

                  {/* Reply area */}
                  <div className="p-6 border-t border-gray-100">
                    <div className="flex gap-3">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={3}
                        placeholder="Escreva sua resposta..."
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins resize-none"
                      />
                      <button
                        onClick={handleSendReply}
                        disabled={!newMessage.trim()}
                        className={`gradient-btn-sm self-end ${
                          !newMessage.trim() ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <ArrowRightIcon className="w-4 h-4" />
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card h-full flex items-center justify-center">
                  <div className="text-center py-16">
                    <MessageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Selecione uma mensagem</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Escolha uma mensagem na lista para visualizar o conteudo
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Nova Mensagem floating button */}
      <button
        onClick={() => setShowNewMessage(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-primary text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 flex items-center justify-center z-40"
        title="Nova Mensagem"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {/* New message modal */}
      {showNewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Nova Mensagem</h2>
              <button
                onClick={() => {
                  setShowNewMessage(false);
                  setNewRecipient("");
                  setNewSubject("");
                  setNewContent("");
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destinatario
                </label>
                <input
                  type="text"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  placeholder="Nome do destinatario"
                  className="filter-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto
                </label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Assunto da mensagem"
                  className="filter-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={5}
                  placeholder="Escreva sua mensagem..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowNewMessage(false);
                  setNewRecipient("");
                  setNewSubject("");
                  setNewContent("");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowNewMessage(false);
                  setNewRecipient("");
                  setNewSubject("");
                  setNewContent("");
                }}
                disabled={!newRecipient.trim() || !newSubject.trim() || !newContent.trim()}
                className={`gradient-btn-sm ${
                  !newRecipient.trim() || !newSubject.trim() || !newContent.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <ArrowRightIcon className="w-4 h-4" />
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
