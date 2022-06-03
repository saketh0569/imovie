package com.example.mrs.service;
import com.example.mrs.model.User;

public interface UserService {
	public User saveUser(User user);
	public User getUser(Integer uid);
//	public String getUserName(Integer uid);
	public User login(String email, String password);
	public void updateUser(User user, Integer uid);
}
