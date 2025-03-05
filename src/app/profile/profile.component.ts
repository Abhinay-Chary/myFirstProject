import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent  implements OnInit{
  name: any;
  _id: any;
  iat: any;
  exp: any;
myTimer: any;
  ngOnInit(): void {
    this.myTimer=0
    let c=setInterval(() => {
      if(this.myTimer>10)
      clearInterval(c);
    this.myTimer++
    }, 1000);
    // sessionStorage.getItem('expiry');
    const token:any = sessionStorage.getItem('expiry');
    const decodedToken:any = jwtDecode(token);
    console.log(decodedToken);
    let {name,_id}=decodedToken.name;
    let {exp,iat}=decodedToken;
    this.name=name;
    this._id=_id;
    exp= new Date(exp*1000)
    this.exp=exp;
    this.iat=new Date(iat*1000);
    console.log(name,_id);
     console.log(exp,iat)
  }

}
