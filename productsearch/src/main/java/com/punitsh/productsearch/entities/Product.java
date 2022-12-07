package com.punitsh.productsearch.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity
public class Product {
	@Id
	private int productId;
	private int price;
	private String productName;
	private String brand;
	private String image;
	private String serviceablePin;
	private String description;
	public Product() {
		super();
	}
	public Product(int productId, int price, String productName, String brand, String image, String serviceablePin,
			String description) {
		this.productId = productId;
		this.price = price;
		this.productName = productName;
		this.brand = brand;
		this.image = image;
		this.serviceablePin = serviceablePin;
		this.description = description;
	}
	public int getProductId() {
		return productId;
	}
	public void setProductId(int productId) {
		this.productId = productId;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getServiceablePin() {
		return serviceablePin;
	}
	public void setServiceablePin(String serviceablePin) {
		this.serviceablePin = serviceablePin;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String toString() {
		return "Product [productId=" + productId + ", price=" + price + ", productName=" + productName + ", brand="
				+ brand + ", image=" + image + ", serviceablePin=" + serviceablePin + ", description=" + description
				+ "]";
	}
	
}
