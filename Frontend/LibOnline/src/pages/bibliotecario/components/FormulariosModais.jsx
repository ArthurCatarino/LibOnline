// Dados dos leitores para o dropdown
const mockLeitores = [
  { id: "012225", nome: "André Duarte Gomes" },
  { id: "012226", nome: "João Victor De Paula" },
  { id: "012227", nome: "Kaique Henrique Santos" },
];

// --- Formulário para Emprestar um Exemplar ---
export const FormEmprestarExemplar = ({ exemplar, livro, onClose }) => {
  const calcularDataDevolucao = () => {
    const data = new Date();
    data.setDate(data.getDate() + 20);
    return data.toLocaleDateString("pt-BR");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const leitorId = event.target.leitor.value;
    alert(
      `Exemplar #${
        exemplar.id
      } emprestado para o leitor ID ${leitorId}!\nDevolução em: ${calcularDataDevolucao()}`
    );
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <p>
          <span className="font-bold">Livro:</span> {livro.titulo}
        </p>
        <p>
          <span className="font-bold">Data de Devolução:</span>{" "}
          {calcularDataDevolucao()}
        </p>
      </div>
      <div className="mb-6">
        <label
          htmlFor="leitor"
          className="block text-gray-300 text-sm font-bold mb-2"
        >
          Emprestar para o leitor:
        </label>
        <select
          id="leitor"
          name="leitor"
          className="w-full bg-[#2D3748] text-gray-200 border-transparent rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
        >
          {mockLeitores.map((leitor) => (
            <option key={leitor.id} value={leitor.id}>
              {leitor.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
        >
          Confirmar Empréstimo
        </button>
      </div>
    </form>
  );
};

// --- Formulário para Editar um Empréstimo ---
export const FormEditarEmprestimo = ({
  exemplar,
  livro,
  onClose,
  todosExemplaresDoLivro,
}) => {
  const exemplaresDisponiveisParaTroca = todosExemplaresDoLivro.filter(
    (e) => e.status === "Disponível" || e.id === exemplar?.id
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const novaData = event.target.dataDevolucao.value;
    const leitorReserva = event.target.reserva.value;
    const status = event.target.status.value;
    alert(
      `Empréstimo do exemplar #${
        exemplar.id
      } atualizado!\nNova Data: ${novaData}\nReserva para: ${
        leitorReserva || "Ninguém"
      }\n${
        exemplar.status.toLowerCase() === status
          ? "Status não alterado"
          : status
      }`
    );
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <p>
          <span className="font-bold">Livro:</span> {livro.titulo}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo para Mudar o Leitor */}
        <div className="mb-4">
          <label
            htmlFor="leitor"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            Atribuir a outro leitor:
          </label>
          <select
            id="leitor"
            name="leitor"
            defaultValue={exemplar?.leitorId} // Padrão é o leitor atual
            className="w-full bg-[#2D3748] text-gray-200 border-transparent rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          >
            {mockLeitores.map((leitor) => (
              <option key={leitor.id} value={leitor.id}>
                {leitor.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Campo para Mudar o Exemplar */}
        <div className="mb-4">
          <label
            htmlFor="exemplar"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            Trocar pelo exemplar:
          </label>
          <select
            id="exemplar"
            name="exemplar"
            defaultValue={exemplar?.id} // Padrão é o exemplar atual
            className="w-full bg-[#2D3748] text-gray-200 border-transparent rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          >
            {exemplaresDisponiveisParaTroca.map((e) => (
              <option key={e.id} value={e.id}>
                ID: {e.id} ({e.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="dataDevolucao"
          className="block text-gray-300 text-sm font-bold mb-2"
        >
          Mudar data de devolução:
        </label>
        <input
          type="date"
          id="dataDevolucao"
          name="dataDevolucao"
          className="w-full bg-[#2D3748] text-gray-200 border-transparent rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="reserva"
          className="block text-gray-300 text-sm font-bold mb-2"
        >
          Adicionar leitor com reserva:
        </label>
        <select
          id="reserva"
          name="reserva"
          className="w-full bg-[#2D3748] text-gray-200 border-transparent rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
        >
          <option value="">Ninguém</option>
          {mockLeitores.map((leitor) => (
            <option key={leitor.id} value={leitor.id}>
              {leitor.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-gray-300 text-sm font-bold mb-2"
        >
          Mudar status:
        </label>
        <select
          id="status"
          name="status"
          className="w-full bg-[#2D3748] text-gray-200 border-transparent rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
        >
          <option value="emprestado">Emprestado</option>
          <option value="disponivel">Disponível</option>
          <option value="danificado">Danificado</option>
        </select>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
        >
          Salvar Alterações
        </button>
      </div>
    </form>
  );
};

// --- Formulário para Adicionar um Novo Exemplar ---
export const FormAdicionarExemplar = ({ livro, onClose, onAddExemplar }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const newId = event.target.idExemplar.value;

    if (!newId) {
      alert("Por favor, insira uma identificação para o novo exemplar.");
      return;
    }

    const novoExemplar = {
      id: newId,
      livroId: livro.id,
      dataCadastro: new Date().toLocaleDateString("pt-BR"),
      status: "Disponível",
      dataDevolucao: null,
      reservadoPor: [],
    };

    onAddExemplar(novoExemplar);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <p>
          <span className="font-bold">Livro:</span> {livro.titulo}
        </p>
      </div>

      <div className="mb-6">
        <label
          htmlFor="idExemplar"
          className="block text-gray-300 text-sm font-bold mb-2"
        >
          Identificação do Novo Exemplar (ID):
        </label>
        <input
          type="text"
          id="idExemplar"
          name="idExemplar"
          placeholder="Ex: 154239"
          className="w-full bg-[#2D3748] text-gray-200 border-transparent rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Adicionar Exemplar
        </button>
      </div>
    </form>
  );
};
