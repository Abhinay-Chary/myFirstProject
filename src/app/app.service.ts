import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../environments/env';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    logout= signal(false);
    apiUrl= environment.apiUrl;

  getCart(name: string) {
    return this.http.get(`${this.apiUrl}/getCart/${name}`)
  }
  saveforLater(user:string,data:Product[]) {
    const quantity = data.map(x => ({
    name: x.name,
    quantity: x.quantity
  }));
  console.log(quantity)
  
    return this.http.post(`${this.apiUrl}/saveForLater`,{userName:user,obj:quantity})
  }
 
  getFruits() {
    return this.http.get(`${this.apiUrl}/getFruits`)
  }
  login(userName:string,password:string) {
   return this.http.post(`${this.apiUrl}/login`,{name:userName,password:password})
  }
  signUp(userName:any,password:any) {
 
return this.http.post(`${this.apiUrl}/signUp`,{name:userName,password:password})
 
  }
  constructor(private http:HttpClient){}
   x=new Subject();

 
  
  data:any={}
}
export interface Product {
  name: string;
  price: number;
  quantity: number;
  source: string;
}
export interface Quantity{
  name:string,
  quantity:number
}
