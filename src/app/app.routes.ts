import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddFruitComponent } from './add-fruit/add-fruit.component';
import { authGuard } from './auth.guard';
import { RxjsTestComponent } from './rxjs-test/rxjs-test.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},{path:'home',component:HomeComponent},
    {path:'addFruit',component:AddFruitComponent},
    {path:'rxjs',component:RxjsTestComponent}
];
