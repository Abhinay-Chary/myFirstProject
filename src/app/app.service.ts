import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'https://original-1.onrender.com/';
 // private apiUrl: 'http://localhost:3000';
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
