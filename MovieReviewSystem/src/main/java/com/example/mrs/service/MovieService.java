package com.example.mrs.service;
import com.example.mrs.model.Movie;

//import antlr.collections.List;
import java.util.List;

public interface MovieService {
	public Movie saveMovie(Movie movie);
	public List<Movie> getAllMovies();
	public Movie getMovie(Integer id);
	public void deleteMovie(Integer id);
	public void updateMovie(Movie movie ,Integer id);
	public void rateMovie(Integer mid, Integer rating);
	public void rateEditMovie(Integer mid, Integer rating, Integer oldrating);
}
