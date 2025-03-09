import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatInput,MatFormField,MatLabel} from '@angular/material/input'
import {MatButtonModule,MatButton} from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { jwtDecode} from 'jwt-decode'
import { catchError, exhaustMap, forkJoin, from, fromEvent, mergeMap, of, switchMap } from 'rxjs';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
constructor(private http:HttpClient,private router:Router,private appService:AppService,private sb:MatSnackBar){}
ngOnInit(){
/*  let a:any=document.getElementById('username')
 fromEvent(a,'input').pipe(
  switchMap(x=>{
    return this.http.get('https://reqres.in/api/users?page=2')
  })
 ).subscribe(xx=>{
  console.log(xx)
 }) */
  
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
        this.sb.open(`${this.userName} logged in successfully`,'close',{
          duration:2000,
          verticalPosition:"top",
          horizontalPosition:"center",
          panelClass:['myPanel']
        })
        this.appService.data.show=false
     /*  setTimeout(() => {
        this.router.navigateByUrl('login')
        alert('loggedOut')
      }, x.expires*1000); */
      }else{
        this.appService.data.show=false;
        alert('invalid credentials')
      }
    });

  }
}
