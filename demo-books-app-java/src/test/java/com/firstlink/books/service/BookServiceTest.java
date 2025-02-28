package com.firstlink.books.service;

import com.firstlink.books.entity.Book;
import com.firstlink.books.repository.BookRepository;
import com.firstlink.books.service.impl.BookServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
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

    public BookServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookRepository.findAll()).willReturn(Arrays.asList(book));

        assertThat(bookService.findAll()).hasSize(1).contains(book);
    }

    @Test
    public void testFindById() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookRepository.findById(anyLong())).willReturn(Optional.of(book));

        assertThat(bookService.findById(1L)).isPresent().contains(book);
    }

    @Test
    public void testSave() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        given(bookRepository.save(any(Book.class))).willReturn(book);

        assertThat(bookService.save(book)).isEqualTo(book);
    }

    @Test
    public void testDeleteById() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");
        book.setAuthor("Test Author");

        doNothing().when(bookRepository).deleteById(anyLong());

        bookService.deleteById(1L);
    }
}
