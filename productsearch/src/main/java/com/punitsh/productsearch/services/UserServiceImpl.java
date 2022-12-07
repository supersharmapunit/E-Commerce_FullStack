package com.punitsh.productsearch.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.punitsh.productsearch.dao.UserDao;
import com.punitsh.productsearch.entities.User;

@Service
public class UserServiceImpl implements UserService { 
	
	@Autowired
	private UserDao userDao;

	@Override
	public List<User> getUsers() {
		// TODO Auto-generated method stub
		return this.userDao.findAll();
	}

	@Override
	public User getUser(String email) {
		// TODO Auto-generated method stub
		User cUser = null;
		try {
			cUser = this.userDao.findById(email).get();
			return cUser;
		} catch(Exception e) {
			return null;
		}
	}

	@Override
	public User addUser(User user) {
		// TODO Auto-generated method stub
		this.userDao.save(user);
		return user;
	}

}
