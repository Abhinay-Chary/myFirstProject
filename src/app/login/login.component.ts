import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInput, MatFormField, MatLabel } from '@angular/material/input'
import { MatButtonModule, MatButton } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { jwtDecode } from 'jwt-decode'
import { catchError, exhaustMap, forkJoin, from, fromEvent, mergeMap, of, switchMap } from 'rxjs';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mydirective } from '../myDirective';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [mydirective],
  imports: [
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
 FormsModule, MatInput, MatFormFieldModule, MatButton, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, public appService: AppService, private sb: MatSnackBar) { }
  ngOnInit() {
    /*  let a:any=document.getElementById('username')
     fromEvent(a,'input').pipe(
      switchMap(x=>{
        return this.http.get('https://reqres.in/api/users?page=2')
      })
     ).subscribe(xx=>{
      console.log(xx)
     }) */

  }
  signUp() {
    this.appService.data.show = true;
    this.appService.signUp(this.userName, this.password).subscribe((x: ApiResponse) => {
      const message: string = x.message ?? "no message from server"
      this.sb.open(message, 'close', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
       this.appService.data.show= false
    })
  }
  login() {

    this.appService.data.show = true;

    this.appService.login(this.userName, this.password).subscribe((x: ApiResponse) => {
      if (x.message === 'Login successful') {
        console.log(x.message);
        // let y:any=jwtDecode(x.token);
        //  console.log(y)

        sessionStorage.setItem('expiry', (x.token??0).toString())

        this.router.navigate(['/home']);
        this.sb.open(`${this.userName} logged in successfully`, 'close', {
          duration: 2000,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ['myPanel']
        })
        this.appService.data.show = false;
        const t:number|undefined= x.token; 
        if(t){
         const dcode= jwtDecode(t.toString());
        
         if(dcode.exp && dcode.iat){
        const timer= setTimeout(() => {
          window.location.reload();
           this.sb.open(`${this.userName} logged out successfully!!
            reason:session timed out`, 'close', {
          duration: 2000,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ['myPanel']
        })
          clearTimeout(timer)
        },(dcode.exp-dcode.iat)*1000 );
      }
        }
        
      } else {
        this.appService.data.show = false;
        alert('invalid credentials')
      }
    });

  }
}

type ApiResponse = {
  message?: string;
  token?:number,
  expiresIn?:number
};