import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BookList from "./BookList";
import axios from "axios";

// Mock axios
jest.mock("axios");

test("deve renderizar lista de livros", async () => {
  const livrosFake = [
    { id: 1, title: "Livro Teste", author: "Autor", genre: "Ficção", readAt: "2023-01-01" }
  ];

  axios.get.mockResolvedValue({ data: livrosFake });

  render(<BookList />);

  await waitFor(() =>
    expect(screen.getByText(/livro teste - autor/i)).toBeInTheDocument()
  );
});
