package com.example.mrs.controller;

import java.util.NoSuchElementException;
import java.util.Objects;

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

import com.example.mrs.model.User;
import com.example.mrs.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping("/add")
	public String add(@RequestBody User user) {
		userService.saveUser(user);
		return "New user added";
	}
	
	@PostMapping("/login")
	public ResponseEntity<Integer> login(@RequestBody User user) {
		User oauthUser = userService.login(user.getEmail(), user.getPass());
		System.out.println(oauthUser.getUid()); // check here for further updation
		if (Objects.nonNull(oauthUser))
			return new ResponseEntity<Integer>(oauthUser.getUid(), HttpStatus.OK);
		else
			return new ResponseEntity<Integer>(HttpStatus.NOT_FOUND);
	}
	
//	@PostMapping("/logout")
//	public void logout(@RequestBody UserController user) {
//		
//	}
	
	@PutMapping("/{uid}")
	public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable Integer uid) {
		try{
			userService.updateUser(user, uid);
            return new ResponseEntity<User>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
	}
	
	@GetMapping("/{uid}")
	public ResponseEntity<User> getUser(@PathVariable Integer uid) {
		try {
			User user = userService.getUser(uid);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		}
		catch (NoSuchElementException e) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}
}
