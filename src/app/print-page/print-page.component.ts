import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css']
})
export class PrintPageComponent implements OnInit {
    
 Nameform: any;
  products: any;
  currentProduct: any;
  currentSection: string = "products";
  
  total: number = 0;
  tax: number=0;
  taxPercent: number=0;
  
  addProductForm: FormGroup = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
  price: new FormControl('', Validators.required),
  Quantity: new FormControl(''),
  total: new FormControl(''),
  // subTotal:new FormControl(''),
      taxPercent:new FormControl(''),
      //tax: new FormControl(''),

      //grantTotal:new FormControl('')
  });
  

  value='';
  onEnter(value:string)
  {
     this.value=this.addProductForm.value;
  }
  constructor() { 
  
//var Nameform = firebase.database().ref("products/-LNa8E-ow6NuF6_NrG9A/addNameForm");
// Nameform.once('value' , function(snapshot)
//       {
//        this.Nameform = snapshot.val();
//        
////        console.log(Nameform);
////        returnArr.push(Nameform);
//        
//        // snapshot.forEach(snapshot.val(), function(value,key){
//    //this.Nameform.push({ id: key, data: value})
//      });
//console.log(Nameform);
//       
}
AddProduct()
{
    this.currentSection="addProduct";
    
}
Add()
{
    //console.log(this.currentProduct);
    if(this.currentProduct == null)
    {
        firebase.database().ref("products/").push(this.addProductForm.value);    
    }
    else
        {
            var str = "products/" + this.currentProduct.key;
            firebase.database().ref(str).update(this.addProductForm.value);
            //console.log(this.addProductForm.value); 
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
   // console.log(data);
    this.currentProduct = data;
    this.currentSection="addProduct";
    this.addProductForm.patchValue(data);
    
}
  
  ngOnInit() {
  
  firebase.database().ref("products/").on('value', resp => {
    this.products = snapshotToArray(resp);
    console.log(snapshotToArray(resp));
    let sub = 0;
    //console.log(this.products[0].addNameForm.name);
    for(let i of this.products){
        
      i.total = i.Quantity*i.price;
      //i.tax =i.taxPercent;
      console.log(i.total);
      //console.log(i.tax);
      if(i.total != 'NaN' && i.total != null)
        {    
            sub += i.total;
            console.log(sub);
        }
       
       }
    this.total = sub;
   // this.tax = i.tax;
   // this.taxPercent = i.taxPercent;
    //console.log(i.tax);
    //console.log(sub);
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
