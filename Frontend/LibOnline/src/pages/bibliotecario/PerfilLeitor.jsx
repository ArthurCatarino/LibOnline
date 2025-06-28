import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  AtSymbolIcon,
  CalendarDaysIcon,
  DevicePhoneMobileIcon,
  HomeIcon,
  IdentificationIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Header from "./components/Header";

// --- API SIMULADA ---
const mockApiPerfis = {
  "012225": {
    id_usuario: "012225",
    nome: "André Duarte Gomes",
    email: "andre.gomes@email.com",
    cpf: "123.456.789-10",
    endereco: "Rua das Flores, 123, Bairro Jardim, Lavras - MG",
    telefone: "(35) 99876-5432",
    data_cadastro: "2025-05-10T10:00:00Z",
    status_ativo: true,
    debito_total: 0,
    emprestimos: [
      {
        id_emprestimo: 101,
        livro_titulo: "O Cortiço",
        data_devolucao_prevista: "2025-07-15T23:59:59Z",
        status_emprestimo: "ativo",
      },
    ],
    reservas: [],
  },
  "012226": {
    id_usuario: "012226",
    nome: "João Victor De Paula",
    email: "joao.paula@email.com",
    cpf: "111.222.333-44",
    endereco: "Avenida Principal, 456, Centro, Rio de Janeiro - RJ",
    telefone: "(21) 98765-4321",
    data_cadastro: "2025-05-01T14:30:00Z",
    status_ativo: false,
    debito_total: 15.5,
    emprestimos: [
      {
        id_emprestimo: 102,
        livro_titulo: "Vidas Secas",
        data_devolucao_prevista: "2025-06-20T23:59:59Z",
        status_emprestimo: "atrasado",
      },
    ],
    reservas: [
      {
        id_reserva: 201,
        livro_titulo: "A Hora da Estrela",
        status_reserva: "pronta para retirada",
        data_reserva: "2025-06-25T09:00:00Z",
      },
    ],
  },
  "012227": {
    id_usuario: "012227",
    nome: "Kaique Henrique Santos",
    data_cadastro: "2025-05-15T08:00:00Z",
    status_ativo: true,
    email: "kaique.santos@email.com",
    cpf: "444.555.666-77",
    telefone: "(11) 97654-3210",
    endereco: "Praça da Sé, 789, Sé, São Paulo - SP",
    debito_total: null,
    emprestimos: [],
    reservas: [
      {
        id_reserva: 202,
        livro_titulo: "Dom Casmurro",
        status_reserva: "ativa",
        data_reserva: "2025-06-26T11:00:00Z",
      },
    ],
  },
};

// Componentes auxiliares para manter o código limpo
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-6 h-6 text-gray-400">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-semibold text-gray-100">{value || "Não informado"}</p>
    </div>
  </div>
);

const PerfilLeitor = () => {
  const { leitorId } = useParams();

  const [leitor, setLeitor] = useState(null);

  useEffect(() => {
    const leitorEncontrado = mockApiPerfis[leitorId];
    setLeitor(leitorEncontrado);
  }, [leitorId]);

  if (!leitor) {
    return (
      <div className="min-h-screen bg-[#2D3748] text-gray-200 flex justify-center items-center">
        <p>Leitor não encontrado ou carregando...</p>
      </div>
    );
  }

  const atividades = [
    ...leitor.emprestimos.map((e) => ({ ...e, tipo: "Empréstimo" })),
    ...leitor.reservas.map((r) => ({ ...r, tipo: "Reserva" })),
  ];

  return (
    <div className="min-h-screen bg-[#2D3748] font-sans text-gray-200">
      <Header variant="back" />

      <main className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-[#4A5568] p-6 rounded-lg shadow-lg flex flex-col items-center h-fit">
            <UserCircleIcon className="h-32 w-32 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-center">{leitor.nome}</h2>
            <span
              className={`mt-2 px-3 py-1 text-sm font-bold rounded-full ${
                leitor.status_ativo
                  ? "bg-green-500/30 text-green-300"
                  : "bg-red-500/30 text-red-300"
              }`}
            >
              {leitor.status_ativo ? "Ativo" : "Inativo"}
            </span>
            <div className="mt-6 border-t border-gray-500 w-full pt-4 text-center">
              <p className="text-sm text-gray-400">Débito Pendente</p>
              <p
                className={`text-2xl font-bold ${
                  leitor.debito_total > 0 ? "text-red-400" : "text-green-400"
                }`}
              >
                {leitor.debito_total
                  ? `R$ ${leitor.debito_total.toFixed(2).replace(".", ",")}`
                  : "Nenhum"}
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            <div className="bg-[#4A5568] p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4 border-b border-gray-500 pb-2">
                Contato e Documentos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoItem
                  icon={<AtSymbolIcon />}
                  label="Email"
                  value={leitor.email}
                />
                <InfoItem
                  icon={<DevicePhoneMobileIcon />}
                  label="Telefone"
                  value={leitor.telefone}
                />
                <InfoItem
                  icon={<IdentificationIcon />}
                  label="CPF"
                  value={leitor.cpf}
                />
                <InfoItem
                  icon={<CalendarDaysIcon />}
                  label="Leitor desde"
                  value={new Date(leitor.data_cadastro).toLocaleDateString(
                    "pt-BR"
                  )}
                />
              </div>
            </div>

            <div className="bg-[#4A5568] p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4 border-b border-gray-500 pb-2">
                Endereço
              </h3>
              <InfoItem
                icon={<HomeIcon />}
                label="Localização"
                value={leitor.endereco}
              />
            </div>

            <div className="bg-[#4A5568] p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4 border-b border-gray-500 pb-2">
                Atividades na Biblioteca
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-400 uppercase">
                    <tr>
                      <th className="p-2">Tipo</th>
                      <th className="p-2">Título do Livro</th>
                      <th className="p-2">Data Relevante</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atividades.length > 0 ? (
                      atividades.map((item) => (
                        <tr
                          key={`${item.tipo}-${
                            item.id_emprestimo || item.id_reserva
                          }`}
                          className="border-t border-gray-600"
                        >
                          <td className="p-2 font-semibold">{item.tipo}</td>
                          <td className="p-2">{item.livro_titulo}</td>
                          <td className="p-2 font-mono">
                            {item.tipo === "Empréstimo"
                              ? new Date(
                                  item.data_devolucao_prevista
                                ).toLocaleDateString("pt-BR")
                              : new Date(item.data_reserva).toLocaleDateString(
                                  "pt-BR"
                                )}
                          </td>
                          <td className={`p-2 font-bold`}>
                            {item.status_emprestimo || item.status_reserva}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center p-4 text-gray-400"
                        >
                          Nenhuma atividade recente.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerfilLeitor;
