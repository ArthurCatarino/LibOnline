import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Logo from "../../../assets/pilha-de-tres-livros.png";

const LibSearchLogo = () => (
  <div className="flex items-center gap-3">
    <img src={Logo} alt="Logo LibSearch" width={50} />
    <h1 className="text-3xl font-bold text-gray-200 tracking-wider">
      LIBONLINE
    </h1>
  </div>
);

const Header = ({ variant = "main", active }) => {
  const navigate = useNavigate();

  const getButtonClass = (buttonName) => {
    const baseClass =
      "px-6 py-2 font-semibold rounded-lg transition-colors cursor-pointer";
    if (active === buttonName) {
      return `${baseClass} bg-gray-200 text-[#2D3748]`;
    }
    return `${baseClass} text-gray-300 hover:bg-[#2D3748]`;
  };

  // Renderiza a navegação com base na prop 'variant'
  const renderNavigation = () => {
    switch (variant) {
      case "back":
        return (
          <nav>
            <button
              onClick={() => navigate(-1)}
              className="bg-[#2D3748] font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Voltar
            </button>
          </nav>
        );

      case "main":
      default:
        return (
          <nav className="flex gap-4">
            <button
              onClick={() => navigate("/livros")}
              className={getButtonClass("livros")}
            >
              LIVROS
            </button>
            <button
              onClick={() => navigate("/leitores")}
              className={getButtonClass("leitores")}
            >
              LEITORES
            </button>
          </nav>
        );
    }
  };

  return (
    <header className="bg-[#4A5568] px-8 py-4 flex justify-between items-center shadow-md">
      <LibSearchLogo />
      {renderNavigation()}
    </header>
  );
};

export default Header;
