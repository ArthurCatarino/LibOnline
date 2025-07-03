import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Modal from "../../components/Modal";
import {
  FormEmprestarExemplar,
  FormEditarEmprestimo,
  FormAdicionarExemplar,
} from "./components/FormulariosModais";
import { formatarData } from "../../utils/dateFormatter";
import { normalizarTexto } from "../../utils/normalizarTexto";
import Header from "./components/Header";

const getStatusClass = (status) => {
  switch (status) {
    case "disponivel":
      return "text-green-400";
    case "emprestado":
      return "text-yellow-400";
    case "danificado":
      return "text-red-500";
    default:
      return "text-gray-300";
  }
};

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

const TabelaExemplares = () => {
  const { livroId } = useParams();

  // Estados da UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados dos dados
  const [livro, setLivro] = useState(null);
  const [leitores, setLeitores] = useState([]); // Para os dropdowns
  const [exemplares, setExemplares] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Estados das Modais
  const [isLoanModalOpen, setLoanModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isReservationsModalOpen, setReservationsModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedExemplar, setSelectedExemplar] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Faz chamadas de API em paralelo para otimizar
      const [livroRes, exemplaresRes, emprestimosRes, leitoresRes] =
        await Promise.all([
          apiClient.get("/listagemLivros"),
          apiClient.get("/listarExemplares"),
          apiClient.get("/listaEmprestimos"),
          apiClient.get("/listarUsuarios"),
        ]);

      const todosExemplares = exemplaresRes.data.mensagem;
      const todosEmprestimos = emprestimosRes.data.mensagem;
      const todosLeitores = leitoresRes.data.mensagem;

      const exemplaresFiltrados = todosExemplares.filter(
        (exemplar) => exemplar.idLivro == livroId
      );

      const exemplaresDoLivro = exemplaresFiltrados.map((exemplar) => {
        // Encontra o empréstimo correspondente a este exemplar, se houver
        const emprestimoInfo = todosEmprestimos.find(
          (e) =>
            e.idExemplar === exemplar.idExemplar &&
            normalizarTexto(e.statusEmprestimo) !== "devolvido"
        );

        let nomeDoLeitor = null;
        // Se encontrou um empréstimo, busca o nome do leitor
        if (emprestimoInfo) {
          const leitorInfo = todosLeitores.find(
            (l) => l.idUsuario === emprestimoInfo.idUsuario
          );
          if (leitorInfo) {
            nomeDoLeitor = leitorInfo.nome;
          }
        }

        return {
          id: exemplar.idExemplar,
          registro: exemplar.numeroRegistro,
          status: normalizarTexto(exemplar.tipo),
          // Se houver um empréstimo, usa a data dele, senão, null
          dataDevolucao: emprestimoInfo
            ? formatarData(emprestimoInfo.dataDevolucaoPrevista)
            : null,
          nomeLeitor: nomeDoLeitor,
          reservadoPor: [],
          emprestimoId: emprestimoInfo ? emprestimoInfo.idEmprestimo : null,
        };
      });

      const livroDosExemplares = livroRes.data.livros.find(
        (livro) => livro.id == livroId
      );

      setLivro(livroDosExemplares);
      setLeitores(leitoresRes.data.mensagem);
      setExemplares(exemplaresDoLivro);
    } catch (err) {
      setError("Falha ao carregar os dados. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Busca de dados inicial com Axios
  useEffect(() => {
    fetchData();
  }, [livroId]);

  // Funções CRUD com API
  const handleAddExemplar = async (novoExemplar) => {
    try {
      await axios.post(`/api/livros/${livroId}/exemplares`, novoExemplar);

      fetchData();
      handleCloseModals();
    } catch (err) {
      alert("Erro ao adicionar exemplar.");
      console.error(err);
    }
  };

  const handleUpdateExemplar = async (exemplarId, dados) => {
    try {
      await axios.put(`/api/exemplares/${exemplarId}`, dados);

      fetchData();
      handleCloseModals();
    } catch (err) {
      alert("Erro ao atualizar empréstimo.");
      console.error(err);
    }
  };

  const handleExcluirExemplar = async (exemplar) => {
    if (window.confirm("Tem certeza que deseja excluir este exemplar?")) {
      try {
        if (exemplar.status == "emprestado") {
          await apiClient.delete(`/deletarEmprestimo/${exemplar.emprestimoId}`);
        }
        fetchData();
        alert(`Exemplar ${exemplar.id} excluido com sucesso!`);
      } catch (err) {
        alert("Erro ao excluir exemplar.");
        console.error(err);
      }
    }
  };

  const handleSearch = (value) => {
    if (!value) {
      fetchData();
    }
    const exemplaresFiltrados = exemplares.filter((e) => e.id == value);
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

  if (loading)
    return (
      <div className="p-8 text-center bg-[#2D3748] text-white font-extrabold min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center bg-[#2D3748] text-red-400 font-extrabold min-h-screen flex items-center justify-center">
        {error}
      </div>
    );

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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <button
              className="bg-[#2D3748] font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => handleSearch(searchValue)}
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
                    Registro
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider">
                    Emprestado para
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
                    <td className="p-4 font-mono">{exemplar.registro}</td>
                    <td
                      className={`p-4 font-semibold ${getStatusClass(
                        exemplar.status
                      )}`}
                    >
                      {exemplar.status}
                    </td>
                    <td className="p-4">{exemplar.nomeLeitor || "---"}</td>
                    <td className="p-4 font-mono">
                      {exemplar.dataDevolucao || "---"}
                    </td>
                    <td className="p-4 text-center">
                      {exemplar.status !== "disponivel" &&
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
                        {exemplar.status === "disponivel" ? (
                          <button
                            onClick={() => handleOpenLoanModal(exemplar)}
                            className="bg-green-600/80 hover:bg-green-500 py-1 px-3 rounded-md text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <PlusIcon className="h-4 w-4" /> Emprestar
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenEditModal(exemplar)}
                            className="bg-blue-600/80 hover:bg-blue-500 py-1 px-3 rounded-md text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <PencilSquareIcon className="h-4 w-4" /> Editar
                          </button>
                        )}
                        <button
                          onClick={() => handleExcluirExemplar(exemplar)}
                          className="bg-red-600/80 hover:bg-red-500 p-2 rounded-md transition-colors cursor-pointer"
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

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleOpenAddModal}
            className="bg-green-600 hover:bg-green-500 font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <PlusIcon className="h-6 w-6" /> Adicionar Exemplar
          </button>
        </div>

        <nav className="mt-6 flex justify-center items-center gap-4">
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

      <Modal
        isOpen={isLoanModalOpen}
        onClose={handleCloseModals}
        title={`Emprestar Exemplar: #${selectedExemplar?.id}`}
      >
        <FormEmprestarExemplar
          exemplar={selectedExemplar}
          livro={livro}
          onClose={handleCloseModals}
          onEmprestar={handleUpdateExemplar}
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
          todosExemplaresDoLivro={exemplares}
          onUpdate={handleUpdateExemplar}
          leitores={leitores}
        />
      </Modal>

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseModals}
        title={`Adicionar Novo Exemplar para: ${livro?.titulo}`}
      >
        <FormAdicionarExemplar
          livro={livro}
          onClose={handleCloseModals}
          onAdd={handleAddExemplar}
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
                const leitorInfo = leitores.find((l) => l.id === leitorId);
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
    </div>
  );
};

export default TabelaExemplares;
