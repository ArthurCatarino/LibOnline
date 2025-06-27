import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#2D3748] h-screen flex flex-col justify-center items-center font-sans p-4">
      <div className="text-center">
        <ExclamationTriangleIcon className="mx-auto h-24 w-24 text-yellow-400" />

        <h2 className="mt-6 text-4xl font-bold text-white">Erro 404</h2>
        <p className="mt-4 text-lg text-gray-300">
          Oops! A página que você está procurando não foi encontrada.
        </p>
        <p className="mt-2 text-md text-gray-400">
          Parece que o link que você seguiu está quebrado ou a página foi
          removida.
        </p>

        <div className="mt-10">
          <button
            onClick={() => navigate("/")}
            className="bg-[#4A5568] text-white font-bold py-3 px-8 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
