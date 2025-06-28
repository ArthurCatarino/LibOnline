import { BrowserRouter, Route, Routes } from "react-router-dom";

// Páginas Públicas
import Login from "./pages/Login";
import Register from "./pages/Register";
// Página não encontrada
import NotFound from "./pages/NotFound";

// Páginas do Leitor
import EmprestimosLeitor from "./pages/leitor/Emprestimos";
import SituacaoLeitor from "./pages/leitor/Situacao";

// Páginas do Bibliotecário
import TabelaLeitores from "./pages/bibliotecario/TabelaLeitores";
import PerfilLeitor from "./pages/bibliotecario/PerfilLeitor";
import TabelaLivros from "./pages/bibliotecario/TabelaLivros";
import TabelaExemplares from "./pages/bibliotecario/TabelaExemplares";
import LeitorLayout from "./pages/leitor/LeitorLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/leitores" element={<TabelaLeitores />} />
        <Route path="/leitor/:leitorId/perfil" element={<PerfilLeitor />} />

        <Route path="/leitor/:leitorId" element={<LeitorLayout />}>
          <Route path="emprestimos" element={<EmprestimosLeitor />} />
          <Route path="situacao" element={<SituacaoLeitor />} />
        </Route>

        <Route path="/livros" element={<TabelaLivros />} />
        <Route
          path="/livro/:livroId/tabela-exemplares"
          element={<TabelaExemplares />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
