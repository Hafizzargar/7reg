import { Routes } from '@angular/router';
import { LogincompComponent } from './component/logincomp/logincomp.component';
import { RegistercompComponent } from './component/registercomp/registercomp.component';

import { NavbarComponent } from './component/navbar/navbar.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { activateGuard } from './utils/activate.guard';
import { ClientComponent } from './component/navbar/main-navbar/client/client/client.component';
import { EmployeeComponent } from './component/navbar/main-navbar/emp/employee/employee.component';

export const routes: Routes = [
  {
    path: '',
    component: LogincompComponent,
  },

  {
    path: 'home',
    // component: NavbarComponent,
    // canActivate:[activateGuard],
    loadComponent: () => import('./component/navbar/navbar.component').then(m => m.NavbarComponent),
    children: [
        { path: '', component: ClientComponent },
      { path: 'clientdata', component: ClientComponent },
      { path: 'empdata', component: EmployeeComponent },
    
    ],
  },
  {
    path: 'register',
    // component:RegistercompComponent,
    loadComponent: () =>
      import('./component/registercomp/registercomp.component').then(
        (m) => m.RegistercompComponent
      ),
  },
//   {
//       path:"**",
//       component:PagenotfoundComponent,
//       loadComponent: () => import('./component/pagenotfound/pagenotfound.component').then(m => m.PagenotfoundComponent)
//   }
];
