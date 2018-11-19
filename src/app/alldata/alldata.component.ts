import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-alldata',
  templateUrl: './alldata.component.html',
  styleUrls: ['./alldata.component.css']
})
export class AlldataComponent implements OnInit {
allData:any;
  constructor() { }

  ngOnInit() {
firebase.database().ref("products/").on('value', resp => {
    this.allData = snapshotToArray(resp);
console.log(snapshotToArray(resp));  
  })
}}
export const snapshotToArray = (snapshot) => {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot){
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
} ;