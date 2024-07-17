import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './views/home/home.page';

const routes: Routes = [
  { path: '', loadChildren: () => import('./views/home/home.module').then(m => m.HomePageModule) },
  {
    path: 'reservas',
    loadChildren: () => import('./views/reservas/reservas.module').then( m => m.ReservasPageModule)
  },   {
    path: 'admin',
    loadChildren: () => import('./views/admin/admin.module').then( m => m.AdminPageModule)
  },
  

  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
