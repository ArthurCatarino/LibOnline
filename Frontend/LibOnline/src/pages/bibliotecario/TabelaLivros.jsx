import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BookOpenIcon,
  InformationCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importa o Axios
import Modal from "../../components/Modal";
import Header from "./components/Header";

// Cria uma instância do Axios com a URL base do seu backend
const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

// Componente auxiliar para exibir informações na modal
const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-semibold text-gray-100">{value}</p>
  </div>
);

const FormAdicionarLivro = ({ onClose, onAddLivro }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const novoLivro = Object.fromEntries(formData.entries());

    // Validação simples
    if (!novoLivro.titulo || !novoLivro.autor) {
      alert("Título e Autor são obrigatórios.");
      return;
    }
    onAddLivro(novoLivro);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="titulo"
          className="block text-sm font-bold text-gray-300 mb-2"
        >
          Título do Livro
        </label>
        <input
          type="text"
          name="titulo"
          id="titulo"
          required
          className="w-full bg-[#2D3748] rounded-lg p-2 focus:ring-2 focus:ring-white focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="autor"
          className="block text-sm font-bold text-gray-300 mb-2"
        >
          Autor
        </label>
        <input
          type="text"
          name="autor"
          id="autor"
          required
          className="w-full bg-[#2D3748] rounded-lg p-2 focus:ring-2 focus:ring-white focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="genero"
            className="block text-sm font-bold text-gray-300 mb-2"
          >
            Gênero
          </label>
          <input
            type="text"
            name="genero"
            id="genero"
            className="w-full bg-[#2D3748] rounded-lg p-2 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="editora"
            className="block text-sm font-bold text-gray-300 mb-2"
          >
            Editora
          </label>
          <input
            type="text"
            name="editora"
            id="editora"
            className="w-full bg-[#2D3748] rounded-lg p-2 focus:ring-2 focus:ring-white focus:outline-none"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg cursor-pointer"
        >
          Adicionar Livro
        </button>
      </div>
    </form>
  );
};

const TabelaLivros = () => {
  const navigate = useNavigate();

  // Estados de UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de Dados
  const [livros, setLivros] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Estados da Modal
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedLivro, setSelectedLivro] = useState(null);

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const fetchLivros = async () => {
    try {
      setLoading(true);
      setError(null);

      const [livrosRes, exemplaresRes] = await Promise.all([
        apiClient.get("/listagemLivros"),
        apiClient.get("/listarExemplares"),
      ]);

      const todosExemplares = exemplaresRes.data;

      const listagemLivros = livrosRes.data.map((livro) => {
        let exemplares = [];
        todosExemplares.forEach((exemplar) => {
          if (exemplar.idLivro == livro.id) {
            exemplares = [...exemplares, { registro: exemplar.numeroRegistro }];
          }
        });
        return {
          id: livro.id,
          titulo: livro.titulo,
          autor: livro.autor,
          genero: livro.genero,
          editora: livro.editora,
          exemplares: exemplares,
        };
      });

      setLivros(listagemLivros);
    } catch (err) {
      setError("Não foi possível carregar os livros.");
      console.error("Erro ao buscar livros:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleSearch = (value) => {
    if (!value) {
      fetchLivros();
    }
    setLivros(
      livros.filter((livro) => {
        const textoBusca = value.toLowerCase();
        return (
          livro.titulo.toLowerCase().includes(textoBusca) ||
          livro.autor.toLowerCase().includes(textoBusca)
        );
      })
    );
  };

  const handleViewExemplares = (livro) =>
    navigate(`/livro/${livro.id}/tabela-exemplares`);

  const handleOpenInfoModal = (livro) => {
    setSelectedLivro(livro);
    setInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setInfoModalOpen(false);
    setSelectedLivro(null);
  };

  const handleOpenAddModal = () => setAddModalOpen(true);
  const handleCloseAddModal = () => setAddModalOpen(false);

  const handleAddLivro = async (dadosDoNovoLivro) => {
    try {
      await apiClient.post("/cadastroLivros", dadosDoNovoLivro);
      handleCloseAddModal();
      fetchLivros();
      alert("Livro adicionado com sucesso!");
    } catch (err) {
      alert("Erro ao adicionar livro.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2D3748] flex flex-col">
        <Header active="livros" />
        <div className="flex-grow flex justify-center items-center text-xl text-gray-300">
          Carregando livros...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#2D3748] flex flex-col">
        <Header active="livros" />
        <div className="flex-grow flex justify-center items-center text-xl text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2D3748] font-sans text-gray-200">
      <Header active="livros" />

      <main className="p-8">
        <h2 className="text-3xl font-bold text-center text-gray-300 uppercase tracking-wider">
          Livros Cadastrados
        </h2>

        <div className="mt-8 mb-6 p-6 bg-[#4A5568] rounded-lg flex items-center gap-4">
          <div className="relative flex-grow">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título ou autor..."
              className="w-full bg-[#2D3748] text-gray-200 border-transparent rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-white transition"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleSearch(searchValue)}
            className="bg-[#2D3748] font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Buscar
          </button>
        </div>

        <div className="bg-[#4A5568] rounded-lg overflow-hidden shadow-lg">
          <table className="w-full text-left">
            <thead className="bg-[#2D3748]/50">
              <tr>
                <th className="p-4 font-bold uppercase tracking-wider">
                  Título
                </th>
                <th className="p-4 font-bold uppercase tracking-wider">
                  Autor
                </th>
                <th className="p-4 font-bold uppercase tracking-wider">
                  Gênero
                </th>
                <th className="p-4 font-bold uppercase tracking-wider text-center">
                  Qtd. Exemplares
                </th>
                <th className="p-4 font-bold uppercase tracking-wider text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => (
                <tr
                  key={livro.id}
                  className="border-t border-gray-600 hover:bg-[#2D3748]/30 transition-colors"
                >
                  <td className="p-4 font-semibold">{livro.titulo}</td>
                  <td className="p-4">{livro.autor}</td>
                  <td className="p-4">{livro.genero}</td>
                  <td className="p-4 font-semibold text-center">
                    {livro.exemplares.length}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() => handleViewExemplares(livro)}
                        className="bg-[#2D3748] py-2 px-4 rounded-lg text-sm font-bold flex items-center gap-2 mx-auto hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        <BookOpenIcon className="h-5 w-5" />
                        VER EXEMPLARES
                      </button>
                      <button
                        onClick={() => handleOpenInfoModal(livro)}
                        className="bg-blue-600/80 py-2 px-4 rounded-lg text-sm font-bold flex items-center gap-2 mx-auto hover:bg-blue-500 transition-colors cursor-pointer"
                      >
                        <InformationCircleIcon className="h-5 w-5" />
                        SABER MAIS
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <nav className="flex-1 flex justify-center items-center gap-4">
            <button
              className="p-2 bg-[#4A5568] rounded-md hover:bg-gray-600 disabled:opacity-50 cursor-pointer"
              disabled
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <span className="text-xl font-bold px-4 py-2 bg-[#2D3748] rounded-md">
              1
            </span>
            <button className="p-2 bg-[#4A5568] rounded-md hover:bg-gray-600 cursor-pointer">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </nav>
          <button
            onClick={handleOpenAddModal}
            className="bg-green-600 hover:bg-green-700 font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <PlusIcon className="h-6 w-6" />
            Adicionar Livro
          </button>
        </div>
      </main>

      <Modal
        isOpen={isInfoModalOpen}
        onClose={handleCloseInfoModal}
        title={selectedLivro?.titulo || ""}
      >
        {selectedLivro && (
          <div className="space-y-4">
            <InfoItem label="Autor" value={selectedLivro.autor} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-500 pt-4">
              <InfoItem label="Gênero" value={selectedLivro.genero} />
              <InfoItem label="Editora" value={selectedLivro.editora} />
            </div>
            <div className="border-t border-gray-500 pt-4">
              <p className="text-sm text-gray-400 mb-2">
                Exemplares Registrados:
              </p>
              {selectedLivro.exemplares.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedLivro.exemplares.map((exemplar) => (
                    <span
                      key={exemplar.registro}
                      className="bg-[#2D3748] text-xs font-mono px-3 py-1 rounded-full"
                    >
                      {exemplar.registro}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Nenhum exemplar cadastrado para este livro.
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        title="Adicionar Novo Livro"
      >
        <FormAdicionarLivro
          onClose={handleCloseAddModal}
          onAddLivro={handleAddLivro}
        />
      </Modal>
    </div>
  );
};

export default TabelaLivros;
