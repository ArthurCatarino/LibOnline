import { useForm } from "react-hook-form";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import Logo from "../assets/pilha-de-tres-livros.png";
import { useNavigate } from "react-router-dom";

const LibSearchLogo = () => (
  <div className="flex flex-col items-center mb-8">
    <img src={Logo} alt="Logo LibSearch" width={100} />
    <h1 className="text-5xl font-bold text-gray-300 tracking-wider mt-2">
      LIBONLINE
    </h1>
  </div>
);

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const password = watch("password", "");

  const onSubmit = (data) => {
    console.log("Dados do formulário de cadastro:", data);
    alert(`Cadastro de ${data.username} realizado com sucesso!`);
    navigate("/login");
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
          {/* Campo Nome Completo */}
          <div className="mb-6">
            <label
              htmlFor="fullName"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Nome completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="fullName"
                type="text"
                className="w-full bg-[#2D3748] text-gray-200 border border-transparent rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white transition"
                placeholder="Insira seu nome"
                {...register("fullName", {
                  required: "O nome completo é obrigatório.",
                })}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-400 text-xs mt-2">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Campo Nome do Usuário */}
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Nome de usuário
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                className="w-full bg-[#2D3748] text-gray-200 border border-transparent rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white transition"
                placeholder="Insira seu nome"
                {...register("username", {
                  required: "O nome de usuário é obrigatório.",
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
          <div className="mb-6">
            <label
              htmlFor="password"
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
                className="w-full bg-[#2D3748] text-gray-200 border border-transparent rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white transition"
                placeholder="Insira sua senha"
                {...register("password", {
                  required: "A senha é obrigatória.",
                  minLength: {
                    value: 8,
                    message: "A senha deve ter pelo menos 8 caracteres.",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Campo Confirmar Senha */}
          <div className="mb-8">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Confirmar senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                className="w-full bg-[#2D3748] text-gray-200 border border-transparent rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white transition"
                placeholder="Insira sua senha novamente"
                {...register("confirmPassword", {
                  required: "A confirmação de senha é obrigatória.",
                  validate: (value) =>
                    value === password || "As senhas não coincidem.",
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Botão de Registrar */}
          <button
            type="submit"
            className="w-full bg-[#2D3748] text-white font-bold py-3 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-700 focus:ring-white transition cursor-pointer"
          >
            Registrar-se
          </button>

          {/* Link para Login */}
          <p className="text-center text-sm text-gray-300 mt-6">
            Já possui uma conta?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-medium text-white hover:underline cursor-pointer"
            >
              Entrar
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
