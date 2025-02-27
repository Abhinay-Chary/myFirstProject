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
constructor(public appService:AppService,private http:HttpClient,private store:Store){

 }
 ngOnInit(): void {
  this.appService.data['cartValue']=0;
  let d:any='st'
  this.appService.data['cartValue']= this.store.select(d)
   this.appService.getFruits().subscribe(x=>{
    console.log(x)
    this.fruits=x
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
