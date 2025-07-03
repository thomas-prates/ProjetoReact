import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookForm from "./BookForm";
import axios from "axios";

// Faz mock do axios
jest.mock("axios");

describe("BookForm", () => {
  test("adiciona um livro corretamente", async () => {
    const mockBook = {
      id: 1,
      title: "Teste",
      author: "Autor",
      genre: "Ficção",
      readAt: "2024-01-01"
    };

    // Mock da resposta do POST
    axios.post.mockResolvedValueOnce({ data: mockBook });

    render(<BookForm />);

    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "Teste" },
    });
    fireEvent.change(screen.getByLabelText(/autor/i), {
      target: { value: "Autor" },
    });
    fireEvent.change(screen.getByLabelText(/gênero/i), {
      target: { value: "Ficção" },
    });
    fireEvent.change(screen.getByLabelText(/data de leitura/i), {
      target: { value: "2024-01-01" },
    });

    fireEvent.click(screen.getByText(/adicionar livro/i));

    // Aguarda o elemento aparecer na tela
    expect(await screen.findByText(/teste - autor/i)).toBeInTheDocument();
  });
});
