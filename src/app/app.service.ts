import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  getFruits() {
    return this.http.get('http://localhost:3000/getFruits')
  }
  login(userName:any,password:any) {
   return this.http.post('http://localhost:3000/login',{name:userName,password:password})
  }
  signUp(userName:any,password:any) {
    console.log('sigUp');
this.http.post('http://localhost:3000/signUp',{name:userName,password:password}).subscribe(x=>{console.log(x)});
 
  }
  constructor(private http:HttpClient){}
   x=new Subject();

 
  
  data:any={}
}
