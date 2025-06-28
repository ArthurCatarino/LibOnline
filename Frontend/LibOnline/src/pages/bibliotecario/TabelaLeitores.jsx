import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Header from "./components/Header";

const mockLeitores = [
  {
    id: "012225",
    nome: "André Duarte Gomes",
    dataCadastro: "10/05/2025",
    status: "Ativo",
  },
  {
    id: "012226",
    nome: "João Victor De Paula",
    dataCadastro: "01/05/2025",
    status: "Inativo",
  },
  {
    id: "012227",
    nome: "Kaique Henrique Santos",
    dataCadastro: "15/05/2025",
    status: "Ativo",
  },
  {
    id: "012228",
    nome: "Paulo Vitor Menezzes",
    dataCadastro: "05/05/2025",
    status: "Inativo",
  },
  {
    id: "012229",
    nome: "Otávio Augusto Marques",
    dataCadastro: "18/05/2025",
    status: "Ativo",
  },
];

const TabelaLeitores = () => {
  const navigate = useNavigate();

  const [SearchValue, setSearchValue] = useState();
  const [leitores, setLeitores] = useState([]);

  useEffect(() => {
    setLeitores(mockLeitores);
  }, []);

  const handleSearch = (value) => {
    setLeitores(
      mockLeitores.filter((leitor) => {
        const nomeLeitor = leitor.nome.toLowerCase();
        const nomeBusca = value.toLowerCase();
        return nomeLeitor.includes(nomeBusca);
      })
    );
  };

  const handleMoreInfo = (leitor) => navigate(`/leitor/${leitor.id}/perfil`);

  return (
    <div className="min-h-screen bg-[#2D3748] font-sans text-gray-200">
      {/* Cabeçalho Fixo */}
      <Header active="leitores" />

      {/* Conteúdo Principal */}
      <main className="p-8">
        <h2 className="text-3xl font-bold text-center text-gray-300 uppercase tracking-wider">
          Leitores Registrados
        </h2>

        {/* Barra de Ferramentas: Busca */}
        <div className="mt-8 mb-6 p-6 bg-[#4A5568] rounded-lg flex items-center gap-4">
          <div className="relative flex-grow">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou identificação..."
              className="w-full bg-[#2D3748] text-gray-200 border-transparent rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-white transition"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleSearch(SearchValue)}
            className="bg-[#2D3748] font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Buscar
          </button>
        </div>

        {/* Tabela de Dados */}
        <div className="bg-[#4A5568] rounded-lg overflow-hidden shadow-lg">
          <table className="w-full text-left">
            <thead className="bg-[#2D3748]/50">
              <tr>
                <th className="p-4 font-bold uppercase tracking-wider">
                  Nome do Leitor
                </th>
                <th className="p-4 font-bold uppercase tracking-wider">
                  Data de cadastro
                </th>
                <th className="p-4 font-bold uppercase tracking-wider">
                  Identificação
                </th>
                <th className="p-4 font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 font-bold uppercase tracking-wider text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {leitores.map((leitor) => (
                <tr
                  key={leitor.id}
                  className="border-t border-gray-600 hover:bg-[#2D3748]/30 transition-colors"
                >
                  <td className="p-4">{leitor.nome}</td>
                  <td className="p-4">{leitor.dataCadastro}</td>
                  <td className="p-4">{leitor.id}</td>
                  <td className="p-4 font-semibold">
                    <span
                      className={
                        leitor.status === "Ativo"
                          ? "text-green-400"
                          : "text-red-500"
                      }
                    >
                      {leitor.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleMoreInfo(leitor)}
                      className="bg-[#2D3748] py-2 px-4 rounded-lg text-sm font-bold flex items-center gap-2 mx-auto hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <PlusCircleIcon className="h-5 w-5" />
                      MAIS INFORMAÇÕES
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <nav className="mt-8 flex justify-center items-center gap-4">
          <button
            className="p-2 bg-[#4A5568] rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 cursor-pointer"
            disabled
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <span className="text-xl font-bold px-4 py-2 bg-[#2D3748] rounded-md">
            1
          </span>
          <button className="p-2 bg-[#4A5568] rounded-md hover:bg-gray-600 transition-colors cursor-pointer">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </nav>
      </main>
    </div>
  );
};

export default TabelaLeitores;
