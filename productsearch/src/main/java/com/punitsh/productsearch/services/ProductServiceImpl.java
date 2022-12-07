package com.punitsh.productsearch.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.punitsh.productsearch.dao.ProductDao;
import com.punitsh.productsearch.entities.Product;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductDao productDao;

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return this.productDao.findAll();
	}

	@Override
	public Product addProduct(Product pdt) {
		// TODO Auto-generated method stub
		this.productDao.save(pdt);
		return pdt;
	}

	@Override
	public List<Product> getProductByPrice(int price) {
		// TODO Auto-generated method stub
		return this.productDao.findByPrice(price);
	}

	@SuppressWarnings("deprecation")
	@Override
	public Product getProductById(int id) {
		// TODO Auto-generated method stub
		return this.productDao.getOne(id);
	}

	@Override
	public List<Product> getProductsByBrand(String brandName) {
		// TODO Auto-generated method stub
		return this.productDao.findByBrand(brandName);
	}

	@Override
	public List<Product> getProductsByName(String pdtName) {
		// TODO Auto-generated method stub
		return this.productDao.findByProductName(pdtName);
	}

}
