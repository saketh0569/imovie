package com.example.mrs.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mrs.model.Comment;
import com.example.mrs.service.CommentService;

@RestController
@RequestMapping("/comment")
@CrossOrigin
public class CommentController {
	@Autowired
	private CommentService commentService;
	
	@PostMapping("/add")
	public String add(@RequestBody Comment comment) {
		commentService.saveComment(comment);
		return "New Comment Added !!";
	}
	
	@GetMapping("/{mid}")
	public List<Comment> getAllCommentsByMid(@PathVariable Integer mid) {
		return commentService.getAllCommentsByMid(mid);
	}
	
	@GetMapping("/each/{cid}")
	public ResponseEntity<Comment> getComment(@PathVariable Integer cid) {
		try {
			Comment comment = commentService.getComment(cid);
			return new ResponseEntity<Comment>(comment, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/{cid}")
	public ResponseEntity<Comment> updateMovie(@RequestBody Comment comment, @PathVariable Integer cid) {
		try{
			commentService.updateComment(comment, cid);
            return new ResponseEntity<Comment>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
        }
	}
	
	@GetMapping("/{mid}/{uid}")
	public List<Comment> getCommentsByMidUid(@PathVariable Integer mid, @PathVariable Integer uid) {
		return commentService.getCommentsByMidUid(mid, uid);
	}
}
