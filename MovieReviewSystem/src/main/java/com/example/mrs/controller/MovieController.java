package com.example.mrs.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mrs.model.Movie;
import com.example.mrs.service.MovieService;

@RestController
@RequestMapping("/movie")
@CrossOrigin
public class MovieController {
	@Autowired
	private MovieService movieService;
	
	@PostMapping("/add")
	public String add(@RequestBody Movie movie) {
		movieService.saveMovie(movie);
		return "New movie added !!";
	}
	
	@GetMapping("/getall")
	public List<Movie> getAllMovies() {
		return movieService.getAllMovies();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Movie> getMovie(@PathVariable Integer id) {
		try {
			Movie movie = movieService.getMovie(id);
			return new ResponseEntity<Movie>(movie, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Movie>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Movie> updateMovie(@RequestBody Movie movie, @PathVariable Integer id) {
		try{
			movieService.updateMovie(movie, id);
            return new ResponseEntity<Movie>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<Movie>(HttpStatus.NOT_FOUND);
        }
	}
	
	@PutMapping("/{mid}/{rating}")
	public void rateMovie(@PathVariable Integer mid, @PathVariable Integer rating) {
		movieService.rateMovie(mid, rating);
	}
	
	@PutMapping("/edit/{mid}/{rating}/{oldrating}")
	public void rateEditMovie(@PathVariable Integer mid, @PathVariable Integer rating, @PathVariable Integer oldrating) {
		movieService.rateEditMovie(mid, rating, oldrating);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Movie> deleteMovie(@PathVariable Integer id) {
		try {
			movieService.deleteMovie(id);			
			return new ResponseEntity<Movie>(HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Movie>(HttpStatus.NOT_FOUND);
		}
	}
}
