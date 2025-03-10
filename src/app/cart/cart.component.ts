import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NgFor } from '@angular/common';
import { pipeprice } from '../pipeprice';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { MatButton } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar'
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,pipeprice,FormsModule,MatButton],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
upi: any;
  user: any;
  src: any;
ngOnInit(): void {
 let token:any= sessionStorage.getItem('expiry');
  let user:any=jwtDecode(token);
  user=user.name.name;
  this.user=user
}
saveForLater() {
  this.appService.data.show=true
  this.appService.saveforLater(this.user,this.appService.data.cart).subscribe(xx=>{
    console.log(xx);
    this.appService.data.show=false;
    this.sb.open('your items are saved','Close',{
     
      verticalPosition:'top',
      horizontalPosition:'center',
      panelClass:['myPanel']

    })
  });
}
buy() {
  this.sb.open('Oops no service is there for payment','Close',{
    duration:500,
    verticalPosition:'top',
    horizontalPosition:'center'
  })
  const upiId = 'yourupi@upi';
  const amount = 500;
  const name = 'Your Business Name';
  const transactionId = Date.now();

  const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&mc=&tid=${transactionId}&tr=${transactionId}&tn=Payment&am=${amount}&cu=INR`

  this.src= `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${encodeURIComponent(upiUrl)}`



}
constructor(public appService:AppService,private sb:MatSnackBar) { 
 
}

}
