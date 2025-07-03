import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton, Divider, TextField, Stack} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

export default function BookList() {
  const [listBook, setListBook] = useState([]);
  const [updateBook, setUpdateBook] = useState({ id: null, title: "", author: "", genre: "", readAt: "",});

  const API_URL = "http://localhost:5000/books/";

  const formRef = useRef(null); // Referência para o formulário

  useEffect(() => { //renderiza lista de livros
  const getBookList = async () => {
    try {
      const resposta = await axios.get(API_URL);
      setListBook(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar livros:", erro);
    }
  };
  getBookList();
}, []);


  const getBook = async (id) => { //faz chamada de um livro
    try {
      const resposta = await axios.get(`${API_URL}${id}`);
      const livro = resposta.data;
      alert(`Livro encontrado:\n${livro.title} - ${livro.author}`);
    } catch (erro) {
      console.error("Erro ao buscar livro:", erro);
      alert("Livro não encontrado.");
    }
  };

  const deleteBook = async (id) => { //remove um livro
    try {
      await axios.delete(`${API_URL}${id}`);
      setListBook((prevList) => prevList.filter((livro) => livro.id !== id));
      alert("Livro removido com sucesso.");
    } catch (erro) {
      console.error("Erro ao remover livro:", erro);
      alert("Erro ao remover livro.");
    }
  };

  const editaLivro = async () => { //edita um livro
    try {
      const resposta = await axios.put(API_URL, updateBook);
      const livroAtualizado = resposta.data;

      setListBook((prevList) =>
        prevList.map((livro) =>
          livro.id === livroAtualizado.id ? livroAtualizado : livro
        )
      );

      // Limpa e esconde o formulário
      setUpdateBook({ id: null, title: "", author: "", genre: "", readAt: "" });
    } catch (erro) {
      console.error("Erro ao editar livro:", erro);
    }
  };

  const atualizarCampo = (campo, valor) => {
    setUpdateBook((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const iniciarEdicao = (livro) => {
    setUpdateBook(livro);

    // Scroll até o formulário e garante renderização
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Livros
      </Typography>

      {listBook.length === 0 ? ( 
        <Typography align="center">Nenhum livro disponível.</Typography> //caso não encontre nenhum livro
      ) : (
        <List>
          {listBook.map((book, index) => (
            <div key={book.id || index}>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton onClick={() => getBook(book.id)}> 
                      <SearchIcon />
                    </IconButton>
                    <IconButton onClick={() => iniciarEdicao(book)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteBook(book.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={`${book.title} - ${book.author}`}
                  secondary={`${book.genre} - ${book.readAt}`}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}

      {/* Formulário visível só quando updateBook tem um id */}
      {updateBook.id && (
        <Box mt={4} ref={formRef}>
          <Typography variant="h6">Editar Livro</Typography>
          <Stack spacing={2} mt={2}>
            <TextField
              label="Título"
              value={updateBook.title}
              onChange={(e) => atualizarCampo("title", e.target.value)}
              fullWidth
            />
            <TextField
              label="Autor"
              value={updateBook.author}
              onChange={(e) => atualizarCampo("author", e.target.value)}
              fullWidth
            />
            <TextField
              label="Gênero"
              value={updateBook.genre}
              onChange={(e) => atualizarCampo("genre", e.target.value)}
              fullWidth
            />
            <TextField
              label="Data de Leitura"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={updateBook.readAt}
              onChange={(e) => atualizarCampo("readAt", e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={editaLivro}>
              Atualizar
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
