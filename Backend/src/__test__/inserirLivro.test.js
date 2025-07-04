// __tests__/persistanceLivro.test.js
const db = require("../db");
const persistanceLivros = require("../persistance/persistanceLivros");

jest.mock("../db");

describe("cadastro", () => {
  it("deve inserir um livro com sucesso", async () => {
    // Simula o retorno do banco (por exemplo, insertId = 1)
    db.query.mockImplementation((query, valores, callback) => {
      callback(null, { insertId: 1, affectedRows: 1 });
    });

    const resultado = await persistanceLivros.cadastro("Livro Teste", "Editora Teste", "Autor Teste", "Ficção");

    expect(resultado).toEqual({ insertId: 1, affectedRows: 1 });
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO libonline.livro"),
      ["Livro Teste", "Editora Teste", "Autor Teste", "Ficção"],
      expect.any(Function)
    );
  });

  it("deve lançar erro se o banco falhar", async () => {
    db.query.mockImplementation((query, valores, callback) => {
      callback(new Error("Erro de banco"), null);
    });

    await expect(
      persistanceLivros.cadastro("Livro Erro", "Editora", "Autor", "Terror")
    ).rejects.toThrow("Erro de banco");
  });
});
