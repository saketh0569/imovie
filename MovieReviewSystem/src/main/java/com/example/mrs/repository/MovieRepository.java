package com.example.mrs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.mrs.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

}
