import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Modal from "./components/Modal";
import {
  FormEmprestarExemplar,
  FormEditarEmprestimo,
  FormAdicionarExemplar,
} from "./components/FormulariosModais";
import Header from "./components/Header";

const mockLivros = [
  {
    id: "9788535914849",
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    genero: "Romance",
    exemplares: 5,
  },
];

const mockLeitores = [
  { id: "012225", nome: "André Duarte Gomes" },
  { id: "012226", nome: "João Victor De Paula" },
  { id: "012227", nome: "Kaique Henrique Santos" },
];

const mockExemplares = [
  {
    id: "154234",
    livroId: "9788535914849",
    dataCadastro: "10/05/2025",
    status: "Emprestado",
    dataDevolucao: "27/06/2025",
    reservadoPor: ["012227"],
  },
  {
    id: "154235",
    livroId: "9788535914849",
    dataCadastro: "21/05/2025",
    status: "Disponível",
    dataDevolucao: null,
    reservadoPor: [],
  },
  {
    id: "154236",
    livroId: "9788535914849",
    dataCadastro: "17/05/2025",
    status: "Disponível",
    dataDevolucao: null,
    reservadoPor: [],
  },
  {
    id: "154237",
    livroId: "9788535914849",
    dataCadastro: "04/05/2025",
    status: "Emprestado",
    dataDevolucao: "15/07/2025",
    reservadoPor: ["012225", "012226"],
  },
  {
    id: "154238",
    livroId: "9788535914849",
    dataCadastro: "28/05/2025",
    status: "Danificado",
    dataDevolucao: null,
    reservadoPor: [],
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Disponível":
      return "text-green-400";
    case "Emprestado":
      return "text-yellow-400";
    case "Danificado":
      return "text-red-500";
    default:
      return "text-gray-300";
  }
};

const TabelaExemplares = () => {
  const { livroId } = useParams();

  const [isLoanModalOpen, setLoanModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isReservationsModalOpen, setReservationsModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [selectedExemplar, setSelectedExemplar] = useState(null);
  const [livro, setLivro] = useState(null);

  const [exemplares, setExemplares] = useState([]);
  const [SearchValue, setSearchValue] = useState();

  const handleSearch = (value) => {
    if (!value) {
      setExemplares(mockExemplares);
      return;
    }
    const exemplaresFiltrados = exemplares.filter((e) => e.id.includes(value));
    setExemplares(exemplaresFiltrados);
  };

  const handleOpenLoanModal = (exemplar) => {
    setSelectedExemplar(exemplar);
    setLoanModalOpen(true);
  };

  const handleOpenEditModal = (exemplar) => {
    setSelectedExemplar(exemplar);
    setEditModalOpen(true);
  };

  const handleOpenReservationsModal = (exemplar) => {
    setSelectedExemplar(exemplar);
    setReservationsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseModals = () => {
    setLoanModalOpen(false);
    setEditModalOpen(false);
    setReservationsModalOpen(false);
    setAddModalOpen(false);
    setSelectedExemplar(null);
  };

  const handleAddExemplar = (novoExemplar) => {
    // Adiciona o novo exemplar em ambas as listas para consistência
    setExemplares([...exemplares, novoExemplar]);
    setExemplares([...exemplares, novoExemplar]);
    handleCloseModals();
  };

  const handleExcluirExemplar = (id) => {
    const novosExemplaresDoLivro = exemplares.filter((e) => e.id !== id);
    setExemplares(novosExemplaresDoLivro);
  };

  useEffect(() => {
    const livroEncontrado = mockLivros.find((l) => l.id === livroId);
    setLivro(livroEncontrado);

    const exemplaresDoLivro = mockExemplares.filter(
      (e) => e.livroId === livroId
    );
    setExemplares(exemplaresDoLivro);
  }, [livroId]);

  return (
    <div className="min-h-screen bg-[#2D3748] font-sans text-gray-200">
      <Header active="livros" />

      <main className="p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-400 uppercase">
            Exemplares:
          </h3>
          <h2 className="text-4xl font-bold text-gray-100 uppercase tracking-wider mt-1">
            {livro ? livro.titulo : "Carregando..."}
          </h2>
        </div>

        <div className="mt-8 mb-6 p-6 bg-[#4A5568] rounded-lg flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-grow">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por identificação do exemplar..."
                className="w-full bg-[#2D3748] text-gray-200 border-transparent rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-white transition"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <button
              className="bg-[#2D3748] font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => handleSearch(SearchValue)}
            >
              Buscar
            </button>
          </div>

          <div className="bg-[#2D3748]/60 rounded-lg overflow-hidden shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-[#2D3748]/50">
                <tr>
                  <th className="p-4 font-bold uppercase tracking-wider">
                    Identificação
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider">
                    Data de Cadastro
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider">
                    Devolução
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider text-center">
                    Reservas
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {exemplares.map((exemplar) => (
                  <tr
                    key={exemplar.id}
                    className="border-t border-gray-600 hover:bg-[#4A5568]/40 transition-colors"
                  >
                    <td className="p-4 font-mono">{exemplar.id}</td>
                    <td className="p-4 font-mono">{exemplar.dataCadastro}</td>
                    <td
                      className={`p-4 font-semibold ${getStatusClass(
                        exemplar.status
                      )}`}
                    >
                      {exemplar.status}
                    </td>
                    <td className="p-4 font-mono">
                      {exemplar.dataDevolucao || "---"}
                    </td>
                    <td className="p-4 text-center">
                      {exemplar.status !== "Disponível" &&
                      exemplar.status != "Danificado" &&
                      exemplar.reservadoPor?.length > 0 ? (
                        <button
                          onClick={() => handleOpenReservationsModal(exemplar)}
                          className="relative hover:opacity-80 transition-opacity cursor-pointer"
                        >
                          <UserGroupIcon className="h-7 w-7 text-blue-400" />
                          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#4A5568]">
                            {exemplar.reservadoPor.length}
                          </span>
                        </button>
                      ) : (
                        <span className="text-gray-500">---</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center items-center gap-3">
                        {exemplar.status === "Disponível" ? (
                          <button
                            onClick={() => handleOpenLoanModal(exemplar)}
                            className="bg-green-600/80 hover:bg-green-500 py-1 px-3 rounded-md text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <PlusIcon className="h-4 w-4" />
                            Emprestar
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenEditModal(exemplar)}
                            className="bg-blue-600/80 hover:bg-blue-500 py-1 px-3 rounded-md text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <PencilSquareIcon className="h-4 w-4" />
                            Editar
                          </button>
                        )}
                        <button
                          className="bg-red-600/80 hover:bg-red-500 p-2 rounded-md transition-colors cursor-pointer"
                          onClick={() => handleExcluirExemplar(exemplar.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="h-fit items-center inline">
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleOpenAddModal}
              className="bg-green-600 hover:bg-green-500 font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <PlusIcon className="h-6 w-6" />
              Adicionar Exemplar
            </button>
          </div>

          <nav className="flex justify-center items-center gap-4 h-fit">
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
        </div>
      </main>

      <Modal
        isOpen={isLoanModalOpen}
        onClose={handleCloseModals}
        title={`Emprestar Exemplar: #${selectedExemplar?.id}`}
      >
        <FormEmprestarExemplar
          exemplar={selectedExemplar}
          livro={livro}
          onClose={handleCloseModals}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        title={`Editar Empréstimo: #${selectedExemplar?.id}`}
      >
        <FormEditarEmprestimo
          exemplar={selectedExemplar}
          livro={livro}
          onClose={handleCloseModals}
        />
      </Modal>
      <Modal
        isOpen={isReservationsModalOpen}
        onClose={handleCloseModals}
        title={`Fila de Reserva - Exemplar #${selectedExemplar?.id}`}
      >
        <div>
          {selectedExemplar?.reservadoPor?.length > 0 ? (
            <ul className="space-y-2">
              {selectedExemplar.reservadoPor.map((leitorId) => {
                const leitorInfo = mockLeitores.find((l) => l.id === leitorId);
                return (
                  <li
                    key={leitorId}
                    className="bg-[#2D3748] p-3 rounded-md text-center"
                  >
                    {leitorInfo ? leitorInfo.nome : `Leitor ID: ${leitorId}`}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center text-gray-400">
              Não há leitores na fila de reserva para este exemplar.
            </p>
          )}
        </div>
      </Modal>
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseModals}
        title={`Adicionar Novo Exemplar para: ${livro?.titulo}`}
      >
        <FormAdicionarExemplar
          livro={livro}
          onClose={handleCloseModals}
          onAddExemplar={handleAddExemplar}
        />
      </Modal>
    </div>
  );
};

export default TabelaExemplares;
