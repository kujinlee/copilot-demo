package com.firstlink.books.service;

import com.firstlink.books.entity.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book> findAll();
    Optional<Book> findById(Long id);
    Book save(Book book);
    void deleteById(Long id);
}