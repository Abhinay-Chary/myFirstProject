import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../environments/env';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    logout= new Subject();
    apiUrl= environment.apiUrl;
  logOut() {
   this.logout.next(true)
  }
  getCart(name: any) {
    return this.http.get(`${this.apiUrl}/getCart/${name}`)
  }
  saveforLater(user:any,data:any) {
    let y:any=[]
    data.forEach((x:any,ind:any)=>{
      y[ind]={
         name: x.name,
        quantity:  x.quantity
      }
  })
  console.log(y)
  
    return this.http.post(`${this.apiUrl}/saveForLater`,{userName:user,obj:y})
  }
 
  getFruits() {
    return this.http.get(`${this.apiUrl}/getFruits`)
  }
  login(userName:any,password:any) {
   return this.http.post(`${this.apiUrl}/login`,{name:userName,password:password})
  }
  signUp(userName:any,password:any) {
 
return this.http.post(`${this.apiUrl}/signUp`,{name:userName,password:password})
 
  }
  constructor(private http:HttpClient){}
   x=new Subject();

 
  
  data:any={}
}
