import { BrowserRouter, Route, Routes } from "react-router-dom";

// Páginas Públicas
import Login from "./pages/Login";
import Register from "./pages/Register";
// Página não encontrada
import NotFound from "./pages/NotFound";

// Layouts de Usuário
import LeitorLayout from "./pages/LeitorLayout";
import BibliotecarioLayout from "./pages/BibliotecarioLayout";
import AdminLayout from "./pages/AdminLayout";

// Páginas do Leitor
import EmprestimosLeitor from "./pages/leitor/Emprestimos";
import SituacaoLeitor from "./pages/leitor/Situacao";
import PagamentoLeitor from "./pages/leitor/Pagamento";

// Páginas do Bibliotecário
import TabelaLeitores from "./pages/bibliotecario/TabelaLeitores";
import PerfilLeitor from "./pages/bibliotecario/PerfilLeitor";
import TabelaLivros from "./pages/bibliotecario/TabelaLivros";
import TabelaExemplares from "./pages/bibliotecario/TabelaExemplares";

// Páginas do Admin
import TabelaUsuarios from "./pages/admin/TabelaUsuarios";
import PerfilUsuario from "./pages/admin/PerfilUsuario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Login />} />

        <Route path="/leitor/:leitorId" element={<LeitorLayout />}>
          <Route path="emprestimos" element={<EmprestimosLeitor />} />
          <Route path="situacao" element={<SituacaoLeitor />} />
          <Route path="pagamento" element={<PagamentoLeitor />} />
        </Route>

        <Route
          path="/bibliotecario/:bibliotecarioId"
          element={<BibliotecarioLayout />}
        >
          <Route path="tabela-leitores" element={<TabelaLeitores />} />
          <Route path="leitor/:leitorId" element={<PerfilLeitor />} />
          <Route path="tabela-livros" element={<TabelaLivros />} />
          <Route
            path="livro/:livroId/tabela-exemplares"
            element={<TabelaExemplares />}
          />
        </Route>

        <Route path="/admin/:adminId" element={<AdminLayout />}>
          <Route path="usuarios" element={<TabelaUsuarios />} />
          <Route path="usuario/:usuarioId" element={<PerfilUsuario />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
