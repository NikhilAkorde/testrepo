import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  detail:any;
  products: any;
  currentProduct: any;
  currentSection: string = "products";
  nameKey:"";
  total: number = 0;
  tax: number=0;
  taxPercent: number=0;
  print :Boolean= true;
  
  addProductForm: FormGroup = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
  price: new FormControl('', Validators.required),
  Quantity: new FormControl(''),
  total: new FormControl(''),
  // subTotal:new FormControl(''),
      taxPercent:new FormControl(''),
      //tax: new FormControl(''),

      //grantTotal:new FormControl('')
    addNameForm : new FormGroup ({
         name:new FormControl(''),
         address:new FormControl('')
      })
  
  });
  
  value='';
  onEnter(value:string)
  {
     this.value=this.addProductForm.value;
  }
  constructor(private router:Router) { 
  }
Print()
{  
   
   this.router.navigate(['/print-page']);
//window.print(); 

}

AddProduct()
{
    this.currentSection="addProduct";
    
}
//submit()
//{
// console.log(this.addNameForm.value);
// var refStr = "products/";
//    refStr += this.nameKey;
//    refStr += "/Name";
//    console.log(refStr);
//    firebase.database().ref(refStr).push(this.addNameForm.value);
//    this.addNameForm.reset();
//}
Add()
{
    console.log(this.currentProduct);
    if(this.currentProduct == null)
    {
        firebase.database().ref("products/").push(this.addProductForm.value);    
    }
    else
        {
            var str = "products/" + this.currentProduct.key;
            firebase.database().ref(str).update(this.addProductForm.value);
            console.log(this.addProductForm.value); 
            this.currentProduct == null
        }
    
    
    this.addProductForm.reset();
    this.currentSection = "products";
}

Delete(index)
{
    this.products.splice(index,1);
    firebase.database().ref("products/").set(this.products);
    
}
Edit(data)
{
    console.log(data);
    this.currentProduct = data;
    this.currentSection="addProduct";
    this.addProductForm.patchValue(data);
    
}
  
  ngOnInit() {
  
  firebase.database().ref("products/").on('value', resp => {
    this.products = snapshotToArray(resp);
    //console.log(snapshotToArray(resp));
    let sub = 0;
    console.log(sub);
    for(let i of this.products){
        
      i.total = i.Quantity*i.price;
      //i.tax =i.taxPercent;
      console.log(i.total);
      //console.log(i.tax);
      if(i.total != 'NaN' && i.total != null)
        {    
            sub += i.total;
            //console.log(sub);
        }
       
       }
    this.total = sub;
   // this.tax = i.tax;
   // this.taxPercent = i.taxPercent;
    //console.log(i.tax);
    console.log(sub);
//      this.tax=this.total*(tax/100);
//      console.log(tax);
    
    
  } );
  }

}

export const snapshotToArray = (snapshot) => {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot){
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
} ;
