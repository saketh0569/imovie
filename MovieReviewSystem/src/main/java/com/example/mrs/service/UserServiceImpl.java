package com.example.mrs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mrs.model.User;
import com.example.mrs.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public User saveUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public User getUser(Integer uid) {
		return userRepository.findById(uid).get();
	}
	
	@Override
	public User login(String email, String password) {
		User user = userRepository.findByEmailAndPass(email, password);
		return user;
	}
	
	@Override
	public void updateUser(User user, Integer uid) {
		User temp = userRepository.findById(uid).get();
		temp.setUname(user.getUname());
		temp.setEmail(user.getEmail());
		temp.setPass(user.getPass());
		
		userRepository.save(temp);
	}
}
