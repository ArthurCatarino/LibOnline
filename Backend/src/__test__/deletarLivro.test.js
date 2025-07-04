const db = require("../db");
const pesistanceLivro = require("../persistance/persistanceLivros");

jest.mock("../db");

describe("deletar", () => {
  it("deve deletar um livro com sucesso", async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    const resultado = await pesistanceLivro.deletar(1);
    expect(resultado).toEqual({ affectedRows: 1 });
  });

  it("deve lançar erro se o livro não for encontrado", async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, { affectedRows: 0 });
    });

    await expect(pesistanceLivro.deletar(999)).rejects.toThrow("Livro não encontrado");
  });

  it("deve lançar erro se o banco retornar erro", async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error("Erro no banco"), null);
    });

    await expect(pesistanceLivro.deletar(1)).rejects.toThrow("Erro no banco");
  });
});
