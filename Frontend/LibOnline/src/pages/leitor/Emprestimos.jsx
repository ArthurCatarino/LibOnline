import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

const mockTodosEmprestimos = [
  {
    id_emprestimo: 1,
    id_usuario: "012225",
    livro_titulo: "O Pequeno Príncipe",
    data_emprestimo: "10/05/2025",
    data_devolucao_prevista: "17/05/2025",
    status_emprestimo: "Devolvido",
  },
  {
    id_emprestimo: 2,
    id_usuario: "012225",
    livro_titulo: "O Hobbit",
    data_emprestimo: "18/05/2025",
    data_devolucao_prevista: "25/05/2025",
    status_emprestimo: "No prazo",
  },
  {
    id_emprestimo: 3,
    id_usuario: "012225",
    livro_titulo: "1984",
    data_emprestimo: "01/05/2025",
    data_devolucao_prevista: "10/05/2025",
    status_emprestimo: "Em atraso",
  },
  {
    id_emprestimo: 4,
    id_usuario: "012227",
    livro_titulo: "Dom Casmurro",
    data_emprestimo: "15/05/2025",
    data_devolucao_prevista: "22/05/2025",
    status_emprestimo: "Devolvido",
  },
  {
    id_emprestimo: 5,
    id_usuario: "012227",
    livro_titulo: "Harry Potter e a Pedra Filosofal",
    data_emprestimo: "02/05/2025",
    data_devolucao_prevista: "09/05/2025",
    status_emprestimo: "Em atraso",
  },
];

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "devolvido":
      return "text-green-400";
    case "em atraso":
      return "text-red-400";
    case "no prazo":
      return "text-yellow-400";
    default:
      return "text-gray-300";
  }
};

const EmprestimosLeitor = () => {
  const { leitorId } = useParams();
  const navigate = useNavigate();

  const [originalEmprestimos, setOriginalEmprestimos] = useState([]);
  const [meusEmprestimos, setMeusEmprestimos] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const emprestimosDoLeitor = mockTodosEmprestimos.filter(
      (e) => e.id_usuario === leitorId
    );
    setMeusEmprestimos(emprestimosDoLeitor);
    setOriginalEmprestimos(emprestimosDoLeitor);
  }, [leitorId]);

  const handleSearch = (value) => {
    if (!value) {
      setMeusEmprestimos(originalEmprestimos);
      return;
    }

    const emprestimosFiltrados = originalEmprestimos.filter((emprestimo) =>
      emprestimo.livro_titulo.toLowerCase().includes(value.toLowerCase())
    );
    setMeusEmprestimos(emprestimosFiltrados);
  };

  const handleSituacaoNavigate = () => {
    navigate(`/leitor/${leitorId}/situacao`);
  };

  return (
    <div className="p-8 text-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-300 uppercase tracking-wider">
        Meus Empréstimos
      </h2>

      <div className="mt-8 mb-6 p-6 bg-[#4A5568] rounded-lg flex items-center gap-4">
        <div className="relative flex-grow">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título do livro..."
            className="w-full bg-[#2D3748] text-gray-200 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-white"
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
                Título do livro
              </th>
              <th className="p-4 font-bold uppercase tracking-wider">
                Data do empréstimo
              </th>
              <th className="p-4 font-bold uppercase tracking-wider">
                Data da devolução
              </th>
              <th className="p-4 font-bold uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {meusEmprestimos.map((emprestimo) => (
              <tr
                key={emprestimo.id_emprestimo}
                className="border-t border-gray-600"
              >
                <td className="p-4 font-semibold">{emprestimo.livro_titulo}</td>
                <td className="p-4">{emprestimo.data_emprestimo}</td>
                <td className="p-4">{emprestimo.data_devolucao_prevista}</td>
                <td
                  className={`p-4 font-bold ${getStatusClass(
                    emprestimo.status_emprestimo
                  )}`}
                >
                  {emprestimo.status_emprestimo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 relative h-12">
        <nav className="absolute inset-x-0 flex justify-center items-center gap-4">
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
          className="absolute right-0 top-0 bg-[#718096] font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
          onClick={handleSituacaoNavigate}
        >
          Consultar Débitos
        </button>
      </div>
    </div>
  );
};

export default EmprestimosLeitor;
