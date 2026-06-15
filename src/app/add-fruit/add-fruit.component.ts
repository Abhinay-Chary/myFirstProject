import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-fruit',
  standalone: true,
  imports: [
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
],
  templateUrl: './add-fruit.component.html',
  styleUrl: './add-fruit.component.scss'
})
export class AddFruitComponent {
  file: any;
 
  constructor(private http:HttpClient){
    
  }
  img: any;
  change(e:any){
  let file= e.target.files[0];
  this.file=file;
  let reader= new FileReader();
  reader.readAsDataURL(file);
  reader.onload=()=>{
      this.img=reader.result;
  }
 
  }
  upload(){
  this.http.post('http://localhost:3000/addFruit',{name:this.file.name,source:this.img}).subscribe(x=>{
    console.log(x,'image upoladed');
  })

  }
}
