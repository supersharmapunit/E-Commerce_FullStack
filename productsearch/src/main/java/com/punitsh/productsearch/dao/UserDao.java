package com.punitsh.productsearch.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.punitsh.productsearch.entities.User;

public interface UserDao extends JpaRepository<User, String> {

}
