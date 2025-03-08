import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ViewComponent } from '../view/view.component';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../interceptors/auth.service';
import { CartComponent } from '../cart/cart.component';
import { Store } from '@ngrx/store';
import {select} from  '../actions/select'
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ViewComponent,CommonModule,ProfileComponent,HttpClientModule,CartComponent],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthService,multi:true}],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  appView:any=true;
  profileView:any=false
  fruits: any;
  cart: boolean=false;
  temp1: any;
  val: any=0;
constructor(public appService:AppService,private http:HttpClient,private store:Store){

 }
 ngOnInit(): void {
  this.appService.data['cartValue']=0;
  let t:any=sessionStorage.getItem('expiry')
  let token:any= jwtDecode(t);
  console.log(token.name.name);
  this.appService.getCart(token.name.name).subscribe((x:any)=>{
    this.temp1=x.data.cart
    console.log(x.data.cart,'cartitem')
  })

  
  let d:any='st'
  this.store.select(d).subscribe(x=>{
    this.val=x
  })
  this.appService.data['cartValue']= this.val
   this.appService.getFruits().subscribe((x:any)=>{
    console.log(x)
    this.fruits=x;
    let z:any;
this.temp1.forEach((r:any,ind:any)=>{
  if(z==undefined)z=[]
 x.forEach((y:any)=>{
    if(r.name==y.name){
      r.source=y.source;
      r.price=y.price*r.quantity;
    }
    })
    
});
console.log(this.temp1);
this.appService.data.cart=this.temp1
this.val=this.temp1.reduce((acc:any,val:any)=>{
  return acc+ val.quantity

},0)
if(this.val){
  this.appService.data.newCartValue=this.val
}

if(z){

}
   })

}
 open(com:keyof HomeComponent){
  this.profileView=false
  this.appView=false;this.cart=false
this[com]=true
console.log(this.store.select(select))
;
 }

}
