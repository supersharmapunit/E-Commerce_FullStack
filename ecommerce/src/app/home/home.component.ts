import { Component, OnInit } from '@angular/core';
import { ProductapiService } from '../services/productapi.service';
import { Product } from '../models/product';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserapiService } from '../services/userapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(private productApiService: ProductapiService, private router: Router, private toast: NgToastService, private userApiService: UserapiService) { }

  ngOnInit(): void {
    if(!this.userApiService.checkUserLoggedIn()){
      this.toast.error({detail: "Not Authorised", summary: "Please login.", duration: 5000});
      this.userApiService.setUserLoggedOut();
      this.router.navigate(['/login']);
    }


    this.fillProductsArr();
  }

  fillProductsArr(){
    this.productApiService.getProducts().subscribe({
      next: (data)=>{
        this.products = data;
        // console.log(this.products);
      },
      error: (error)=>{
        // console.log("Somthing wrong with the servers error getting the products");
        // console.log(error);
        this.toast.error({detail: "Server Error", summary: "Please try again.", duration: 5000});
      }
    });
  }

  handleSearch(searchPdt: string, sparameter: string){
    if(searchPdt.length == 0) return;
    if(sparameter == 'price'){
      this.router.navigate(['/searchresult'],{queryParams:{sparameter: 'price', searchPdt: searchPdt}});
    } else if(sparameter == 'brand'){
      this.router.navigate(['/searchresult'],{queryParams:{sparameter: 'brand', searchPdt: searchPdt}});
    } else {
      this.router.navigate(['/searchresult'],{queryParams:{sparameter: 'pdtId', searchPdt: searchPdt}});
    }
  }

  handlePriceFilter(lboundInput: string, uboundInput: string) {
    // console.log("inside price filter");
    // console.log("lboundInput "+ lboundInput +  " uboundInput "+ uboundInput);
    
    if(lboundInput == '' || uboundInput == '') return;

    let minPrice = parseInt(lboundInput);
    let maxPrice = parseInt(uboundInput);

    if(minPrice > maxPrice || minPrice < 0 || maxPrice < 0) return;

    // console.log("minPrice: " + minPrice + " maxPrice: " + maxPrice);
    

    let filteredProducts: Product[] = this.products.filter((pdt)=>{
      return pdt.price >= minPrice && pdt.price <= maxPrice;
    });

    // console.log(filteredProducts);
    this.products = filteredProducts;
    
  }

  handleFilterReset(){
    this.fillProductsArr();
    this.handlePriceFilter('0', '10000000');
  }

}
