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

import java.util.Arrays;
import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookController.class)
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Test
    public void testGetAllBooks() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookService.findAll()).willReturn(Arrays.asList(book));

        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title", is(book.getTitle())));
    }

    @Test
    public void testGetBookById() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookService.findById(anyLong())).willReturn(Optional.of(book));

        mockMvc.perform(get("/api/books/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is(book.getTitle())));
    }

    @Test
    public void testGetBookByIdNotFound() throws Exception {
        given(bookService.findById(anyLong())).willReturn(Optional.empty());

        mockMvc.perform(get("/api/books/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testCreateBook() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookService.save(any(Book.class))).willReturn(book);

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\":\"Test Book\",\"author\":\"Test Author\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is(book.getTitle())));
    }

    @Test
    public void testUpdateBook() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookService.findById(anyLong())).willReturn(Optional.of(book));
        given(bookService.save(any(Book.class))).willReturn(book);

        mockMvc.perform(put("/api/books/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\":\"Updated Book\",\"author\":\"Updated Author\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Updated Book")));
    }

    @Test
    public void testDeleteBook() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookService.findById(anyLong())).willReturn(Optional.of(book));
        Mockito.doNothing().when(bookService).deleteById(anyLong());

        mockMvc.perform(delete("/api/books/1"))
                .andExpect(status().isOk());
    }
}
