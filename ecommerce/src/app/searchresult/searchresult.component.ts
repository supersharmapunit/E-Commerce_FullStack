import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductapiService } from '../services/productapi.service';
import { NgToastService } from 'ng-angular-popup';
import { UserapiService } from '../services/userapi.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})
export class SearchresultComponent implements OnInit {

  searchBy: string = '';
  searchInput: string = '';
  searchedPdts: Product[] = [];

  constructor(private toast: NgToastService,private productApiService: ProductapiService,private router: Router, private route: ActivatedRoute, private userApiService: UserapiService) { }

  ngOnInit(): void {

    if(!this.userApiService.checkUserLoggedIn()){
      this.userApiService.setUserLoggedOut();
      this.toast.error({detail: "Not Authorised", summary: "Please login.", duration: 5000});
      this.router.navigate(['/login']);
    }


    this.route.queryParams.subscribe(params => {
      this.searchBy = params['sparameter'];
      this.searchInput = params['searchPdt'];  
    });

    if(this.searchBy == 'price'){
      this.productApiService.getProductsByPrice(parseInt(this.searchInput)).subscribe({
        next: (data)=>{
          this.searchedPdts = data;
          // console.log(this.searchedPdts);
        },
        error: (err)=>{
          // console.log("something went wrong with the servers");
          this.toast.error({detail: "Server Error", summary: "Please try again.", duration: 5000});
          // console.log(err);
        }
      });
    } else if (this.searchBy == 'brand'){
      this.productApiService.getProductsByBrand(this.searchInput).subscribe({
        next: (data)=>{
          this.searchedPdts = data;
          // console.log(this.searchedPdts);
          
        },
        error: (err)=>{
          // console.log("something went wrong with the servers");
          // console.log(err);
          this.toast.error({detail: "Server Error", summary: "Please try again.", duration: 5000});
        }
      });

    } else {
      this.productApiService.getProductByProductId(parseInt(this.searchInput)).subscribe({
        next: (data)=>{
          this.searchedPdts.push(data);
          console.log(this.searchedPdts);
          
        },
        error: (err)=>{
          // console.log("something went wrong with the servers");
          // console.log(err);
          this.toast.error({detail: "Server Error", summary: "Please try again.", duration: 5000});
        }
      });
    }
  }
  

}
