package com.punitsh.productsearch.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.punitsh.productsearch.entities.Product;

public interface ProductDao extends JpaRepository<Product, Integer>{

	List<Product> findByPrice(@Param(value="price") int price);
	List<Product> findByProductName(@Param(value="productName") String productName);
	List<Product> findByBrand(@Param(value="brand") String brand);
}
