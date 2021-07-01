import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { LoginComponent } from './screens/login/login.component';
import { TokenguardGuard } from './shared/guards/tokenguard.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [TokenguardGuard],
    children: [
      {
        path: "",
        loadChildren: ()=>import ('./screens/dashboard/dashboard.module').then(mod => mod.DashboardModule),
      },
    ],
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
