package com.firstlink.books.controller;

import com.firstlink.books.entity.Book;
import com.firstlink.books.service.BookService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BookController.class)
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Test
    public void testGetAllBooks() throws Exception {
        given(bookService.getAllBooks()).willReturn(Collections.emptyList());

        mockMvc.perform(get("/books"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetBookById() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookService.getBookById(anyLong())).willReturn(Optional.of(book));

        mockMvc.perform(get("/books/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetBookByIdNotFound() throws Exception {
        given(bookService.getBookById(anyLong())).willReturn(Optional.empty());

        mockMvc.perform(get("/books/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testCreateBook() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookService.createBook(any(Book.class))).willReturn(book);

        mockMvc.perform(post("/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\": \"Test Book\", \"author\": \"Test Author\"}"))
                .andExpect(status().isCreated());
    }

    @Test
    public void testUpdateBook() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Updated Book");
        book.setAuthor("Updated Author");

        given(bookService.getBookById(anyLong())).willReturn(Optional.of(book));
        given(bookService.updateBook(anyLong(), any(Book.class))).willReturn(book);

        mockMvc.perform(put("/books/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\": \"Updated Book\", \"author\": \"Updated Author\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteBook() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookService.getBookById(anyLong())).willReturn(Optional.of(book));
        Mockito.doNothing().when(bookService).deleteBook(anyLong());

        mockMvc.perform(delete("/books/1"))
                .andExpect(status().isNoContent());
    }
}