import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatCard, MatCardActions, MatCardAvatar, MatCardContent} from '@angular/material/card'
import { AppService } from '../app.service';
import { Store, StoreModule } from '@ngrx/store';
import { cr } from '../actions/reducers';
import { inc,dec, } from '../actions/actions';

import { select } from '../actions/select';
import { pipeprice } from '../pipeprice';
import { backgroundDirective } from '../backgroundDirective';
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [MatCard,MatCardAvatar,MatCardContent,MatCardActions,MatButtonModule,MatButton,NgFor,pipeprice,backgroundDirective],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
  @Input()
  fruits:any;
  constructor(private http:HttpClient,private appService:AppService,private store:Store){

  }
  addToCart(item:any,act:any){
 let c=eval(act);
 let d;
 this.appService.data.cartValue.subscribe((x:any)=>{
d=x
 })
 if(d==0 && act =='dec' )
  return 
else
   { alert('abhi')
    this.store.dispatch(c());
    // this.store.dispatch(update({ data: item }));
    
    if(this.appService.data.cart==undefined)
    {this.appService.data.cart=[];
    
  this.appService.data.cart.push({name:item.name,source:item.source,price:item.price,quantity:1})}
  else
  {
    let found=false;
    this.appService.data.cart.forEach((element:any) => {
      if(element.name==item.name){
        if(act=='inc'){
        element.price=element.price+item.price
        element.quantity+=1;
        }
      else{
        element.quantity-=1;

        element.price=element.price-item.price
      }
      found=true
      }else{
      
      }
    })
    if(found==false){
      this.appService.data.cart.push({name:item.name,source:item.source,price:item.price,quantity:1})

    }
    this.appService.data.cartPrice= this.appService.data.cart.reduce((acc:any,x:any)=>{
      return +x.price+acc
    },0)
  }
   // this.store.dispatch(update({data:item}))
   }
   
  console.log('a');
   
    
   /*  this.http.post('http://localhost:3000/addToCart',{item:item}).subscribe((x:any)=>{
      console.log(x);
      if(x.added=='true'){
        this.appService.data.cartValue+=1;
        this.appService.data.cart.push(item);
      }
    }) */
  }


  }
