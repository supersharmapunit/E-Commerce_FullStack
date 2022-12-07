package com.punitsh.productsearch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.punitsh.productsearch.entities.Product;
import com.punitsh.productsearch.entities.User;
import com.punitsh.productsearch.services.ProductService;
import com.punitsh.productsearch.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
//@CrossOrigin
public class MyController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private ProductService productService;
	
	
//	USER ENDPOINTS
	
//	get all users
	@GetMapping("/user")
	public List<User> getUsers() {
		return this.userService.getUsers();
	}
	
//	get one user
	@GetMapping("/user/{email}")
	public User getUser(@PathVariable String email) {
		return this.userService.getUser(email);
	}
	
//	add user
	@PostMapping(path="/user", consumes="application/json")
	public User addUser(@RequestBody User user) {
		return this.userService.addUser(user);
	}
	
	
	
//	PRODUCT ENDPOINTS
	
//	get all products
	@GetMapping("/product")
	public List<Product> getAllProducts() {
		return this.productService.getAllProducts();
	}
	
//	get products by price
	@GetMapping("/product/price/{price}")
	public List<Product> getProductByPrice(@PathVariable String price){
		return this.productService.getProductByPrice(Integer.parseInt(price));
	}
	
//	get product by Id
	@GetMapping("/product/{pdtId}")
	public Product getProductById(@PathVariable String pdtId) {
		return this.productService.getProductById(Integer.parseInt(pdtId));
	}
	
//	get products by brand name
	@GetMapping("/product/brand/{brandName}")
	public List<Product> getProductByBrandName(@PathVariable String brandName){
		return this.productService.getProductsByBrand(brandName);
	}
	
//	get product by products name
	@GetMapping("/product/name/{pdtName}")
	public List<Product> getProductByProductName(@PathVariable String pdtName){
		return this.productService.getProductsByName(pdtName);
	}
	
//	add product
	@PostMapping(path="/product", consumes="application/json")
	public Product addProduct(@RequestBody Product pdt) {
		return this.productService.addProduct(pdt);
	}
}
