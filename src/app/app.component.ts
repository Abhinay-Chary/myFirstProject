import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'MyEndToEndApp';
  
  constructor(private router:Router,public appService:AppService){}
  ngOnInit(): void {
    this.appService.data.show=false
    // this.router.navigateByUrl('login');
  }
}
