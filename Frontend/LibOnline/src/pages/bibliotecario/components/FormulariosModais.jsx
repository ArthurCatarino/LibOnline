import { normalizarTexto } from "../../../utils/normalizarTexto";

// --- Formulário para Emprestar um Exemplar ---
export const FormEmprestarExemplar = ({
  exemplar,
  livro,
  leitores,
  onClose,
  criarEmprestimo,
}) => {
  const calcularDataDevolucao = () => {
    const data = new Date();
    data.setDate(data.getDate() + 20);
    return data.toLocaleDateString("pt-BR");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const leitorId = event.target.leitor.value;

    const dadosParaApi = {
      idFuncionario: 2,
      idUsuario: leitorId,
      idExemplar: exemplar.id,
    };
    criarEmprestimo(dadosParaApi);
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
          {leitores.map((leitor) => (
            <option key={leitor.idUsuario} value={leitor.idUsuario}>
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
  emprestimos,
  exemplar,
  livro,
  onClose,
  todosExemplaresDoLivro,
  leitores,
  editarEmprestimo,
  editarExemplar,
  devolverEmprestimo,
  renovarEmprestimo,
}) => {
  const exemplaresDisponiveisParaTroca = todosExemplaresDoLivro.filter(
    (e) => normalizarTexto(e.status) === "disponivel" || e.id === exemplar?.id
  );

  const emprestimo = emprestimos.find(
    (emprestimo) => emprestimo.idExemplar === exemplar.id
  );

  // Handler para o novo botão de renovação
  const handleRenovar = () => {
    if (!exemplar?.dataDevolucao) {
      alert(
        "Não é possível renovar um empréstimo sem data de devolução definida."
      );
      return;
    }

    // Chama a função de update da API
    renovarEmprestimo(emprestimo.idEmprestimo);
    alert(`Empréstimo renovado por mais 15 dias!`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const status = event.target.status?.value;
    if (status !== exemplar.status) {
      if (status == "disponivel") {
        if (emprestimo) devolverEmprestimo(emprestimo);
        const statusAtualizado = {
          idLivro: livro.id,
          numeroRegistro: exemplar.registro,
          tipo: status,
        };
        editarExemplar(exemplar.id, statusAtualizado);
        onClose();
      } else if (status == "danificado" && emprestimo) {
        const novoExemplar = {
          idExemplar: exemplaresDisponiveisParaTroca[0].id,
        };
        console.log(exemplaresDisponiveisParaTroca[0].id);
        editarEmprestimo(emprestimo.id, novoExemplar);
        // dados com o status atual do exemplar
        const statusAtualizado = { tipo: status };
        editarExemplar(exemplar.id, statusAtualizado);
        // dados com o novo status do novo exemplar do empréstimo
        const novoStatus = { tipo: "emprestado" };
        editarExemplar(exemplaresDisponiveisParaTroca[0].id, novoStatus);
        onClose();
      }
    } else if (emprestimo) {
      // A submissão principal agora só lida com as outras alterações
      const dadosParaApi = {
        idUsuario: event.target.leitor?.value,
        idExemplar: event.target.exemplar?.value,
      };
      editarEmprestimo(emprestimo.idEmprestimo, dadosParaApi);
      onClose();
    } else {
      alert("Nenhuma alteração feita");
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <p>
          <span className="font-bold">Livro:</span> {livro.titulo}
        </p>
      </div>
      {emprestimo && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {leitores.map((l) => (
                  <option key={l.idUsuario} value={l.idUsuario}>
                    {l.nome}
                  </option>
                ))}
              </select>
            </div>
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

          {normalizarTexto(emprestimo?.statusEmprestimo) == "ativo" && (
            <div className="mb-4 pt-4 border-t border-gray-600">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Renovação do Empréstimo:
              </label>
              <p className="text-sm text-gray-400 mb-3">
                A data de devolução atual é:{" "}
                <span className="font-semibold text-gray-200">
                  {exemplar?.dataDevolucao || "N/D"}
                </span>
              </p>
              <button
                type="button"
                onClick={handleRenovar}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Renovar por mais 15 dias
              </button>
            </div>
          )}

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
              {leitores.map((leitor) => (
                <option key={leitor.id} value={leitor.id}>
                  {leitor.nome}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
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
          {normalizarTexto(exemplar.status) == "emprestado" ? (
            <>
              <option value="emprestado">Emprestado</option>
              <option value="disponivel">Disponível</option>
              <option value="danificado">Danificado</option>
            </>
          ) : (
            <>
              <option value="danificado">Danificado</option>
              <option value="disponivel">Disponível</option>
            </>
          )}
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
          Salvar Outras Alterações
        </button>
      </div>
    </form>
  );
};

// --- Formulário para Adicionar um Novo Exemplar ---
export const FormAdicionarExemplar = ({
  livro,
  onClose,
  adicionarExemplar,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const numRegistro = event.target.idExemplar.value;

    if (!numRegistro) {
      alert("Por favor, insira o código de registro do exemplar.");
      return;
    }

    const novoExemplar = {
      idLivro: livro.id,
      numeroRegistro: numRegistro,
    };

    adicionarExemplar(novoExemplar);
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
          Registro do Novo Exemplar:
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
