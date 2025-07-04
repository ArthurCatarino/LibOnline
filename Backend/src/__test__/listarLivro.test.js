const db = require("../db");
const persistanceLivro = require("../persistance/persistanceLivros");

jest.mock("../db");

describe("listagem", () => {
  it("deve retornar uma lista de livros", async () => {
    const livrosMock = [
      { idLivro: 1, titulo: "Livro A", autor: "Autor A", genero: "Romance", editora: "Editora X" },
      { idLivro: 2, titulo: "Livro B", autor: "Autor B", genero: "Terror", editora: "Editora Y" }
    ];

    db.query.mockImplementation((query, callback) => {
      callback(null, livrosMock);
    });

    const resultado = await persistanceLivro.listagem();
    expect(resultado).toEqual(livrosMock);
    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM libonline.livro",
      expect.any(Function)
    );
  });

  it("deve lançar erro se a consulta falhar", async () => {
    db.query.mockImplementation((query, callback) => {
      callback(new Error("Erro no banco"), null);
    });

    await expect(persistanceLivro.listagem()).rejects.toThrow("Erro no banco");
  });
});
