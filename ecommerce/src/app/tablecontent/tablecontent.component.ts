import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../models/product';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-tablecontent',
  templateUrl: './tablecontent.component.html',
  styleUrls: ['./tablecontent.component.scss']
})
export class TablecontentComponent implements OnInit, OnChanges  {

  currProduct!: Product;

  @Input() products: Product[] = [];

  constructor(private toast: NgToastService) { }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if(this.products.length > 0){
      this.productSorting('price');
    }
  }

  ngOnInit(): void {
    
  }

  productSorting(sorter: string){
    if(sorter == 'price'){
      this.products = this.products.sort((a,b) => a.price - b.price);
    } else if(sorter == 'brand'){

    }
  }


  handleProductClick(product: Product){
    this.currProduct = product;
  }

  handleCheckAvailablity(sPincode: string){
    if(sPincode == '' || sPincode.length == 0 || sPincode == null) 
      return;
    
    let pincode = parseInt(sPincode);
    let serviceAbility = this.currProduct.serviceablePin.split(',');
    
    // console.log(pincode);
    // console.log(serviceAbility);

    for(let serviceablePin of serviceAbility){
      if(pincode == parseInt(serviceablePin)){
        // console.log(pincode +" is serviceable");
        let days = Math.floor(Math.random() * 10) + 1;
        this.toast.success({detail: "Serviceable", summary: `Get delivery in ${days} days`, duration: 5000});
        return;
      }
    }

    // console.log(pincode +" is not serviceable");
    this.toast.warning({detail: "Not Serviceable", summary: `${pincode} is not serviceable`, duration: 5000});
  }
}
