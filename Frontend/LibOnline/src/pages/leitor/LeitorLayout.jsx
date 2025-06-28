import { Outlet, useParams, Link } from "react-router-dom";
import Logo from "../../assets/pilha-de-tres-livros.png"; // Ajuste o caminho

// Simulação de dados do leitor logado (em uma app real, viria de um contexto de autenticação)
const mockLeitorInfo = {
  "012225": { debito: 0.0 },
  "012226": { debito: 15.5 },
  "012227": { debito: 0.0 },
};

const HeaderLeitor = () => {
  const { leitorId } = useParams();
  const leitor = mockLeitorInfo[leitorId] || { debito: 0.0 };

  return (
    <header className="bg-[#4A5568] px-8 py-4 flex justify-between items-center shadow-md text-gray-200">
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo LibSearch" width={50} />
        <h1 className="text-3xl font-bold tracking-wider">LIBSEARCH</h1>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-semibold">Débito:</p>
        <span
          className={`px-4 py-2 font-bold rounded-lg ${
            leitor.debito > 0 ? "bg-red-500/80" : "bg-green-500/80"
          }`}
        >
          R$ {leitor.debito.toFixed(2).replace(".", ",")}
        </span>
      </div>
    </header>
  );
};

const LeitorLayout = () => {
  return (
    <div className="min-h-screen bg-[#2D3748] font-sans">
      <HeaderLeitor />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LeitorLayout;
