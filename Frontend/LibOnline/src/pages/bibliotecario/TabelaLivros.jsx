import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BookOpenIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./components/Modal";
import Header from "./components/Header";

const mockLivros = [
  {
    id_livro: "9788535914849",
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    genero: "Romance",
    exemplares: 5,
    isbn: "978-85-359-1484-9",
    editora: "Companhia das Letras",
    ano_publicacao: 2009,
  },
  {
    id_livro: "9788579802685",
    titulo: "O Cortiço",
    autor: "Aluísio Azevedo",
    genero: "Naturalismo",
    exemplares: 3,
    isbn: "978-85-798-0268-5",
    editora: "Zahar",
    ano_publicacao: 2015,
  },
  {
    id_livro: "9788535902785",
    titulo: "Vidas Secas",
    autor: "Graciliano Ramos",
    genero: "Modernismo",
    exemplares: 7,
    isbn: "978-85-359-0278-5",
    editora: "Record",
    ano_publicacao: 1997,
  },
  {
    id_livro: "9788571640428",
    titulo: "A Hora da Estrela",
    autor: "Clarice Lispector",
    genero: "Modernismo",
    exemplares: 0,
    isbn: "978-85-716-4042-8",
    editora: "Rocco",
    ano_publicacao: 1998,
  },
  {
    id_livro: "9788504018635",
    titulo: "O Auto da Compadecida",
    autor: "Ariano Suassuna",
    genero: "Comédia",
    exemplares: 10,
    isbn: "978-85-04-01863-5",
    editora: "Nova Fronteira",
    ano_publicacao: 2013,
  },
];

// Componente auxiliar para exibir informações
const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-semibold text-gray-100">{value}</p>
  </div>
);

const TabelaLivros = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [livros, setLivros] = useState([]);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedLivro, setSelectedLivro] = useState(null);

  useEffect(() => {
    setLivros(mockLivros);
  }, []);

  const handleSearch = (value) => {
    if (!value) {
      setLivros(mockLivros);
      return;
    }
    setLivros(
      mockLivros.filter((livro) => {
        const textoBusca = value.toLowerCase();
        return (
          livro.titulo.toLowerCase().includes(textoBusca) ||
          livro.autor.toLowerCase().includes(textoBusca)
        );
      })
    );
  };

  const handleViewExemplares = (livro) =>
    navigate(`/livro/${livro.id_livro}/tabela-exemplares`);

  const handleOpenInfoModal = (livro) => {
    setSelectedLivro(livro);
    setInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setInfoModalOpen(false);
    setSelectedLivro(null);
  };

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
                  Exemplares
                </th>
                <th className="p-4 font-bold uppercase tracking-wider text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => (
                <tr
                  key={livro.id_livro}
                  className="border-t border-gray-600 hover:bg-[#2D3748]/30 transition-colors"
                >
                  <td className="p-4 font-semibold">{livro.titulo}</td>
                  <td className="p-4">{livro.autor}</td>
                  <td className="p-4">{livro.genero}</td>
                  <td className="p-4 font-semibold text-center">
                    {livro.exemplares}
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

        <nav className="mt-8 flex justify-center items-center gap-4">
          <button
            className="p-2 bg-[#4A5568] rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 cursor-pointer"
            disabled
          >
            <ChevronLeftIcon className="h-6 w-6 " />
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
              <InfoItem
                label="Ano de Publicação"
                value={selectedLivro.ano_publicacao}
              />
              <InfoItem label="ISBN" value={selectedLivro.isbn} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TabelaLivros;
