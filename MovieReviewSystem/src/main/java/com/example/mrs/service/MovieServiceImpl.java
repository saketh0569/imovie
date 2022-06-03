package com.example.mrs.service;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mrs.model.Movie;
import com.example.mrs.repository.MovieRepository;

//import antlr.collections.List;
import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {
	@Autowired
	private MovieRepository movieRepository;
	
	@Override
	public Movie saveMovie(Movie movie) {
		return movieRepository.save(movie);
	}
	
	@Override
	public List<Movie> getAllMovies() {
		return movieRepository.findAll();
	}

	@Override
	public Movie getMovie(Integer id) {
		return movieRepository.findById(id).get();
	}

	@Override
	public void deleteMovie(Integer id) {
		movieRepository.deleteById(id);
	}

	@Override
	public void updateMovie(Movie movie, Integer id) {
		Movie temp = movieRepository.findById(id).get();
		temp.setName(movie.getName());
		temp.setUrl(movie.getUrl());
		temp.setDescription(movie.getDescription());
		
		movieRepository.save(temp);
	}

	@Override
	public void rateMovie(Integer mid, Integer rating) {
		Movie temp = movieRepository.findById(mid).get();
		Double r = temp.getRating()*temp.getNumberOfUsersRated();
		temp.setNumberOfUsersRated(temp.getNumberOfUsersRated()+1);
		r= r+rating;
		r = r/temp.getNumberOfUsersRated();

		double val = Math.round(r*100.0)/100.0;
		temp.setRating(val);
		
		movieRepository.save(temp);
	}
	
	@Override
	public void rateEditMovie(Integer mid, Integer rating, Integer oldrating) {
		Movie temp = movieRepository.findById(mid).get();
		Double r = temp.getRating()*temp.getNumberOfUsersRated();
//		temp.setNumberOfUsersRated(temp.getNumberOfUsersRated());
		r= r+rating-oldrating;
		r = r/temp.getNumberOfUsersRated();
		
		double val = Math.round(r*100.0)/100.0;
		temp.setRating(val);
		
		movieRepository.save(temp);
	}
}
