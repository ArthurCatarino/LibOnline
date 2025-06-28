import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import Modal from "../../components/Modal";

const mockTodosEmprestimos = [
  {
    id_emprestimo: 1,
    id_usuario: "012225",
    livro_titulo: "O Pequeno Príncipe",
    data_emprestimo: "10/05/2025",
    data_devolucao_prevista: "17/05/2025",
    status_emprestimo: "Devolvido",
    valor_multa: null,
  },
  {
    id_emprestimo: 2,
    id_usuario: "012225",
    livro_titulo: "O Hobbit",
    data_emprestimo: "18/05/2025",
    data_devolucao_prevista: "25/05/2025",
    status_emprestimo: "Em atraso",
    valor_multa: 5.0,
  },
  {
    id_emprestimo: 3,
    id_usuario: "012225",
    livro_titulo: "1984",
    data_emprestimo: "01/05/2025",
    data_devolucao_prevista: "10/05/2025",
    status_emprestimo: "Em atraso",
    valor_multa: 4.0,
  },
  {
    id_emprestimo: 4,
    id_usuario: "012227",
    livro_titulo: "Dom Casmurro",
    data_emprestimo: "15/05/2025",
    data_devolucao_prevista: "22/05/2025",
    status_emprestimo: "Devolvido",
    valor_multa: null,
  },
  {
    id_emprestimo: 5,
    id_usuario: "012227",
    livro_titulo: "A menina que roubava livros",
    data_emprestimo: "05/05/2025",
    data_devolucao_prevista: "14/05/2025",
    status_emprestimo: "Em atraso",
    valor_multa: 4.0,
  },
  {
    id_emprestimo: 6,
    id_usuario: "012227",
    livro_titulo: "Harry Potter e a Pedra Filosofal",
    data_emprestimo: "02/05/2025",
    data_devolucao_prevista: "09/05/2025",
    status_emprestimo: "Em atraso",
    valor_multa: 2.0,
  },
];

const calcularDiasDeAtraso = (dataVencimentoStr) => {
  const partes = dataVencimentoStr.split("/");
  const dataVencimento = new Date(
    Number(partes[2]),
    Number(partes[1]) - 1,
    Number(partes[0])
  );
  const hoje = new Date();
  dataVencimento.setHours(0, 0, 0, 0);
  hoje.setHours(0, 0, 0, 0);
  if (hoje <= dataVencimento) return 0;
  const umDiaEmMs = 1000 * 60 * 60 * 24;
  const diferencaEmMs = hoje.getTime() - dataVencimento.getTime();
  return Math.ceil(diferencaEmMs / umDiaEmMs);
};

const SituacaoLeitor = () => {
  const { leitorId } = useParams();
  const [debitos, setDebitos] = useState([]);
  const [originalDebitos, setOriginalDebitos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [totalDebito, setTotalDebito] = useState(0);

  const fakePixKey =
    "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913NOME DO RECEBEDOR6008BRASILIA62070503***6304E7DE";

  useEffect(() => {
    const emprestimosComDebito = mockTodosEmprestimos.filter(
      (e) => e.id_usuario === leitorId && e.valor_multa > 0
    );
    const debitosComCalculo = emprestimosComDebito.map((emprestimo) => ({
      ...emprestimo,
      dias_atraso: calcularDiasDeAtraso(emprestimo.data_devolucao_prevista),
    }));
    const total = debitosComCalculo.reduce(
      (acc, debito) => acc + debito.valor_multa,
      0
    );
    setTotalDebito(total);
    setDebitos(debitosComCalculo);
    setOriginalDebitos(debitosComCalculo);
  }, [leitorId]);

  const handleSearch = (value) => {
    if (!value) {
      setDebitos(originalDebitos);
      return;
    }
    const debitosFiltrados = originalDebitos.filter((debito) =>
      debito.livro_titulo.toLowerCase().includes(value.toLowerCase())
    );
    setDebitos(debitosFiltrados);
  };

  const handleOpenPaymentModal = () => setPaymentModalOpen(true);
  const handleClosePaymentModal = () => setPaymentModalOpen(false);

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(fakePixKey).then(() => {
      alert("Código PIX copiado para a área de transferência!");
    });
  };

  const handleConfirmPayment = () => {
    // AQUI ENTRARIA A LÓGICA DE CHAMADA DA API
    alert(
      `Pagamento de R$ ${totalDebito
        .toFixed(2)
        .replace(".", ",")} confirmado!\nO sistema será atualizado em breve.`
    );

    // Simula o sucesso limpando a lista e fechando a modal
    setDebitos([]);
    setOriginalDebitos([]);
    setTotalDebito(0);
    handleClosePaymentModal();
  };

  return (
    <div className="p-8 text-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-300 uppercase tracking-wider">
        Situação dos Empréstimos
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
          className="bg-[#2D3748] font-bold py-3 px-8 rounded-lg hover:bg-gray-800 cursor-pointer"
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
                Data do vencimento
              </th>
              <th className="p-4 font-bold uppercase tracking-wider">
                Dias de atraso
              </th>
              <th className="p-4 font-bold uppercase tracking-wider">
                Valor em débito
              </th>
            </tr>
          </thead>
          <tbody>
            {debitos.map((debito) => (
              <tr
                key={debito.id_emprestimo}
                className="border-t border-gray-600"
              >
                <td className="p-4 font-semibold">{debito.livro_titulo}</td>
                <td className="p-4">{debito.data_devolucao_prevista}</td>
                <td className="p-4 font-bold text-red-400">
                  {debito.dias_atraso} {debito.dias_atraso > 1 ? "dias" : "dia"}
                </td>
                <td className="p-4 font-semibold">
                  R$ {debito.valor_multa.toFixed(2).replace(".", ",")}
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
          onClick={handleOpenPaymentModal}
          disabled={debitos.length === 0}
          className="absolute right-0 top-0 bg-[#4A5568] font-bold py-3 px-6 rounded-lg hover:bg-gray-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Realizar Pagamento
        </button>
      </div>

      <Modal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        title="Realizar Pagamento de Débitos"
      >
        <div className="text-center">
          <p className="text-gray-300">Valor total a ser pago:</p>
          <p className="text-4xl font-bold text-green-400 my-2">
            R$ {totalDebito.toFixed(2).replace(".", ",")}
          </p>
          <label
            htmlFor="pixKey"
            className="text-sm text-gray-400 mt-4 mb-2 block"
          >
            PIX Copia e Cola:
          </label>
          <div className="relative">
            <input
              id="pixKey"
              type="text"
              readOnly
              value={fakePixKey}
              className="w-full bg-[#2D3748] text-gray-400 border-transparent rounded-lg p-3 pr-12 text-xs select-all"
            />
            <button
              onClick={handleCopyPixKey}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:bg-[#4A5568] rounded-md transition-colors cursor-pointer"
            >
              <ClipboardDocumentIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={handleClosePaymentModal}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Fechar
            </button>
            <button
              onClick={handleConfirmPayment}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Confirmar Pagamento
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SituacaoLeitor;
