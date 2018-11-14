import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})


export class FormsComponent implements OnInit {

profileForm=new FormGroup({
Name: new FormControl(''),
Product: new FormControl(''),
Quantity: new FormControl(''),
Rate: new FormControl(''),
Amount: new FormControl(''),
paid:new FormControl(''),
Remaining:new FormControl('')
});

value ='';
 onEnter( value: string ) 
{ this.value = this.profileForm.value; }



  constructor(private router:Router) { }
  onSubmit()
   {
   var ref =firebase.database().ref("billdata/");
   ref.push(this.profileForm.value);
   this.router.navigate(['/table']);  
   }


  ngOnInit() {
  }

}
