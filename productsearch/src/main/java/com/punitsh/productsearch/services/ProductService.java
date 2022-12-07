package com.punitsh.productsearch.services;

import java.util.List;

import com.punitsh.productsearch.entities.Product;

public interface ProductService {
	public List<Product> getAllProducts();
	public Product addProduct(Product pdt);
	public List<Product> getProductByPrice(int price);
	public Product getProductById(int id);
	public List<Product> getProductsByBrand(String brandName);
	public List<Product> getProductsByName(String pdtName);
}
