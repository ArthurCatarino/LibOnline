import React from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";

// Componente para o Logo
const LibSearchLogo = () => (
  <div className="flex flex-col items-center mb-8">
    {/* Ícone de Livros (SVG) */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-16 h-16 text-gray-400"
    >
      <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      <path d="M10.5 1.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75V3a.75.75 0 01-.75.75h-1.5A.75.75 0 0110.5 3V1.5z" />
    </svg>

    <h1 className="text-5xl font-bold text-gray-300 tracking-wider mt-2">
      LIBSEARCH
    </h1>
  </div>
);

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched", // A validação ocorrerá no evento onBlur
  });

  const onSubmit = (data) => {
    // Aqui você pode adicionar a lógica de autenticação
    console.log("Dados do formulário:", data);
    alert(`Bem-vindo, ${data.username}!`);
  };

  return (
    <div className="bg-[#2D3748] min-h-screen flex flex-col items-center justify-center font-sans">
      <LibSearchLogo />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#4A5568] p-10 rounded-2xl shadow-lg w-full max-w-sm"
        noValidate // Desativa a validação nativa do browser
      >
        {/* Campo Nome do Usuário */}
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Nome do usuário
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              type="text"
              className="w-full bg-[#2D3748] text-gray-200 border border-transparent rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Insira seu nome"
              {...register("username", {
                required: "O nome de usuário é obrigatório.",
                validate: (value) =>
                  !validator.isEmpty(value.trim()) ||
                  "O nome de usuário não pode ser apenas espaços.",
              })}
            />
          </div>
          {errors.username && (
            <p className="text-red-400 text-xs mt-2">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Campo Senha */}
        <div className="mb-4">
          <label
            htmlFor="password"
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
              id="password"
              type="password"
              className="w-full bg-[#2D3748] text-gray-200 border border-transparent rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Insira sua senha"
              {...register("password", {
                required: "A senha é obrigatória.",
                validate: (value) =>
                  validator.isLength(value, { min: 8 }) ||
                  "A senha deve ter pelo menos 8 caracteres.",
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="text-right mb-6">
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-blue-400 hover:underline transition"
          >
            Esqueceu a senha?
          </a>
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="w-full bg-[#2D3748] text-white font-bold py-3 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-white transition"
          >
            Entrar
          </button>

          <button
            type="button"
            className="w-full bg-[#718096] text-white font-bold py-3 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-white transition"
          >
            Registrar-se
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
