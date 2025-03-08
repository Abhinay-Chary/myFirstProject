import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    logout= new Subject();
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
  private apiUrl = 'https://original-1.onrender.com';
  //private apiUrl ='http://localhost:3000';
  getFruits() {
    return this.http.get(`${this.apiUrl}/getFruits`)
  }
  login(userName:any,password:any) {
   return this.http.post(`${this.apiUrl}/login`,{name:userName,password:password})
  }
  signUp(userName:any,password:any) {
 
this.http.post(`${this.apiUrl}/signUp`,{name:userName,password:password}).subscribe(x=>{console.log(x)});
 
  }
  constructor(private http:HttpClient){}
   x=new Subject();

 
  
  data:any={}
}
