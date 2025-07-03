import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Stack, List, ListItem, ListItemText } from "@mui/material";

export default function BookForm() {
  const [listBook, setListBook] = useState([]);
  const [book, setBook] = useState({ id: null, title: "", author: "", genre: "", readAt: "", });

  const API_URL = "http://localhost:5000/books/";

  const handleChange = (field) => (event) => {
    setBook({ ...book, [field]: event.target.value });
  };

  async function postBook() {
    try {
      const resposta = await axios.post(API_URL, book);
      const novoLivro = resposta.data;
      setListBook((prev) => [...prev, novoLivro]);
      setBook({ id: null, title: "", author: "", genre: "", readAt: "" });
    } catch (erro) {
      console.error("Erro ao adicionar livro:", erro);
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Cadastrar Livro
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Título"
          value={book.title}
          onChange={handleChange("title")}
          fullWidth
        />
        <TextField
          label="Autor(a)"
          value={book.author}
          onChange={handleChange("author")}
          fullWidth
        />
        <TextField
          label="Gênero"
          value={book.genre}
          onChange={handleChange("genre")}
          fullWidth
        />
        <TextField
          label="Data de Leitura"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={book.readAt}
          onChange={handleChange("readAt")}
          fullWidth
        />
        <Button variant="contained" onClick={postBook}>
          Adicionar Livro
        </Button>
      </Stack>

      {/* Lista dos livros cadastrados neste componente*/}
      {listBook.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Livros adicionados:</Typography>
          <List>
            {listBook.map((book, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${book.title} - ${book.author}`}
                  secondary={`${book.genre} - ${book.readAt}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
