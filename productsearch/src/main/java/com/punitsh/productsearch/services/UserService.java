package com.punitsh.productsearch.services;

import java.util.List;

import com.punitsh.productsearch.entities.User;

public interface UserService {

	public List<User> getUsers();
	public User getUser(String email);
	public User addUser(User user);
}
