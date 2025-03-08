import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardAvatar, MatCardContent } from '@angular/material/card'
import { AppService } from '../app.service';
import { Store, StoreModule } from '@ngrx/store';
import { cr } from '../actions/reducers';
import { inc, dec, } from '../actions/actions';
import { FormsModule } from '@angular/forms';
import { select } from '../actions/select';
import { pipeprice } from '../pipeprice';
import { backgroundDirective } from '../backgroundDirective';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatButton, NgFor, pipeprice, backgroundDirective],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit, OnChanges {
  forSearch: any;
  va: any = '';

  temp: any;

  @Input()
  fruits: any;
  ngOnInit(): void {
    this.temp = [...this.fruits];
    this.forSearch = [...this.fruits]
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.temp = [...this.fruits]
    this.forSearch = [...this.fruits]

  }
  filter(sel: any) {
    console.log(sel);
    if (sel != '') {
      if (sel == 'Vegetable')
        this.temp = this.fruits.filter((item: any) => {
          return item.type != undefined && item.name.includes(this.va.toLowerCase())
        }
        )
      else if (sel == 'Fruits') {
        this.temp = this.fruits.filter((item: any) => {
          return item.type == undefined && item.name.toLowerCase().includes(this.va.toLowerCase())
        })
      }

    }
    else {

      this.temp = this.fruits.filter((item: any) => {
        return item.name.toLowerCase().includes(this.va.toLowerCase())
      })
    }
  }
  constructor(private http: HttpClient, private appService: AppService, private store: Store) {

  }
  addToCart(item: any, act: any) {
    //  let c=eval(act);
    let d;
  let ee:any='st'

  if(this.appService.data.newCartValue){
    d=this.appService.data.newCartValue;
    this.appService.data.newCartValue=''
  }else
    this.store.select(ee).subscribe((x: any) => {
      d = x
    })
    if (d == 0 && act == 'dec')
      return;
    else {
      if (act == 'dec'){}
      else
        this.store.dispatch(inc({data:d}));
      // this.store.dispatch(update({ data: item }));
      let doDec=false;
      let found1=false
      if (this.appService.data.cart == undefined) {
        this.appService.data.cart = [];

        this.appService.data.cart.push({ name: item.name, source: item.source, price: item.price, quantity: 1 })
      }
      else {
        let found = false;
       found1=  this.appService.data.cart.some((x:any)=>{
          return x.name==item.name
       })
        this.appService.data.cart.forEach((element: any, ind: any) => {
          if (element.name == item.name) {
            if (act == 'inc') {
              element.price = element.price + item.price
              element.quantity += 1;
            }
            else {
              if(element.quantity==0){doDec=true;
                
              }
              if (element.quantity != 0) {
                element.quantity -= 1;
                element.price = element.price - item.price
               
                if(element.price==0){
                  this.appService.data.cart.splice(ind, 1);
                
                }
              }
              else {
                
              }
            }
            found = true
          } else {

          }
        })
        if (found == false && act=='inc') {
          this.appService.data.cart.push({ name: item.name, source: item.source, price: item.price, quantity: 1 })

        }
      
        this.appService.data.cartPrice = this.appService.data.cart.reduce((acc: any, x: any) => {
          return +x.price + acc
        }, 0)
      }
      if(doDec==false && act=='dec' &&found1!=false){this.store.dispatch(dec({data:d}));}
    
    }



    /*  this.http.post('http://localhost:3000/addToCart',{item:item}).subscribe((x:any)=>{
       console.log(x);
       if(x.added=='true'){
         this.appService.data.cartValue+=1;
         this.appService.data.cart.push(item);
       }
     }) */
  }


}
