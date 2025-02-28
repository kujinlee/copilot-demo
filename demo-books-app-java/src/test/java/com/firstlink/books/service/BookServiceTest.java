package com.firstlink.books.service;

import com.firstlink.books.entity.Book;
import com.firstlink.books.repository.BookRepository;
import com.firstlink.books.service.impl.BookServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;

public class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookServiceImpl bookService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllBooks() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookRepository.findAll()).willReturn(Collections.singletonList(book));

        assertThat(bookService.getAllBooks()).hasSize(1).contains(book);
    }

    @Test
    public void testGetBookById() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookRepository.findById(anyLong())).willReturn(Optional.of(book));

        assertThat(bookService.getBookById(1L)).isPresent().contains(book);
    }

    @Test
    public void testCreateBook() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookRepository.save(any(Book.class))).willReturn(book);

        assertThat(bookService.createBook(book)).isEqualTo(book);
    }

    @Test
    public void testUpdateBook() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Updated Book");
        book.setAuthor("Updated Author");

        given(bookRepository.findById(anyLong())).willReturn(Optional.of(book));
        given(bookRepository.save(any(Book.class))).willReturn(book);

        assertThat(bookService.updateBook(1L, book)).isEqualTo(book);
    }

    @Test
    public void testDeleteBook() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookRepository.findById(anyLong())).willReturn(Optional.of(book));
        doNothing().when(bookRepository).deleteById(anyLong());

        bookService.deleteBook(1L);
    }
}
