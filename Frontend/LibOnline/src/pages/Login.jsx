import React, { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import axios from "axios"; // Importa o Axios
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import Logo from "../assets/pilha-de-tres-livros.png";
import { useNavigate } from "react-router-dom";

// Cria uma instância do Axios com a URL base do seu backend
const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

const LibSearchLogo = () => (
  <div className="flex flex-col items-center mb-8">
    <img src={Logo} alt="Logo da LibOnline" width={100} />
    <h1 className="text-5xl font-bold text-gray-300 tracking-wider mt-2">
      LIBONLINE
    </h1>
  </div>
);

const Login = () => {
  const navigate = useNavigate();

  // Estados para feedback da API
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // Função onSubmit agora é async para lidar com a chamada da API
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      // Faz a requisição POST para a rota /login
      const response = await apiClient.post("/login", data);

      const usuario = response.data.mensagem;

      alert(`Bem-vindo(a), ${usuario.nome}!`);

      // Redireciona o usuário com base no tipo
      if (usuario.tipo_usuario === "leitor") {
        navigate(`/leitor/${usuario.id_usuario}/emprestimos`);
      } else if (
        usuario.tipo_usuario === "bibliotecario" ||
        usuario.tipo_usuario === "administrador"
      ) {
        navigate("/livros");
      } else {
        // Fallback para uma rota padrão, caso necessário
        navigate("/");
      }
    } catch (error) {
      // Exibe o erro vindo da API ou uma mensagem padrão
      const errorMessage =
        error.response?.data?.mensagem ||
        "Erro ao tentar fazer login. Tente novamente.";
      setApiError(errorMessage);
      console.error("Erro no login:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#2D3748] h-fit">
      <div className="min-h-screen py-5 flex flex-col items-center justify-center font-sans">
        <LibSearchLogo />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#4A5568] p-10 rounded-2xl shadow-lg w-full max-w-sm"
          noValidate
        >
          {/* MUDANÇA: Campo 'username' alterado para 'email' */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                className="w-full bg-[#2D3748] text-gray-200 border border-transparent rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white transition"
                placeholder="Insira seu email"
                {...register("email", {
                  required: "O email é obrigatório.",
                  validate: (value) =>
                    validator.isEmail(value) ||
                    "Por favor, insira um email válido.",
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* MUDANÇA: Campo 'password' agora é registrado como 'senha' para a API */}
          <div className="mb-4">
            <label
              htmlFor="senha"
              name="password"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="senha"
                type="password"
                className="w-full bg-[#2D3748] text-gray-200 border border-transparent rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white transition"
                placeholder="Insira sua senha"
                {...register("senha", {
                  required: "A senha é obrigatória.",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres.",
                  },
                })}
              />
            </div>
            {errors.senha && (
              <p className="text-red-400 text-xs mt-2">
                {errors.senha.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mb-6">
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-blue-400 hover:underline transition"
            >
              Esqueceu a senha?
            </a>
          </div>

          {/* Exibe mensagem de erro da API */}
          {apiError && (
            <div className="bg-red-500/30 text-red-300 text-center p-3 rounded-lg mb-4">
              {apiError}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isSubmitting} // Desabilita o botão durante o envio
              className="w-full bg-[#2D3748] text-white font-bold py-3 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-700 focus:ring-white transition cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
            <button
              type="button"
              className="w-full bg-[#718096] text-white font-bold py-3 rounded-full hover:bg-gray-500 transition cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Registrar-se
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
