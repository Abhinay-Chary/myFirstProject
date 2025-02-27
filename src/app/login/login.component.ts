import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatInput,MatFormField,MatLabel} from '@angular/material/input'
import {MatButtonModule,MatButton} from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { jwtDecode} from 'jwt-decode'
import { catchError, exhaustMap, forkJoin, from, mergeMap, of, switchMap } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule,FormsModule,MatInput,MatFormField,MatFormFieldModule,MatLabel,MatButton,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  userName:any='Abhi';
  password:any='Abhi';
constructor(private http:HttpClient,private router:Router,private appService:AppService){}
ngOnInit(){
  console.log('forRJ');
  const arr=this.http.get('http://localhost:3000/getFruits').pipe(catchError(e=>{return of(['error1'])}))
  const arr2=this.http.get('https://reqres.in/api/users?page=2').pipe(catchError(e=>{return of(['error2'])}))
 forkJoin(
 arr,arr2
 ).subscribe(([a,b])=>{
console.log("x",a)
console.log("y",b)
 },

 )
}
  signUp(){
    this.appService.signUp(this.userName,this.password)
   }
  login(){
    this.appService.data.show=true;
    this.appService.login(this.userName,this.password).subscribe((x:any)=>{
      if(x.message=='userExists'){
        console.log(x.message);
       // let y:any=jwtDecode(x.token);
      //  console.log(y)
      
        sessionStorage.setItem('expiry',x.token)
        
        this.router.navigate(['/home']);
        this.appService.data.show=false
     /*  setTimeout(() => {
        this.router.navigateByUrl('login')
        alert('loggedOut')
      }, x.expires*1000); */
      }
    });

  }
}
