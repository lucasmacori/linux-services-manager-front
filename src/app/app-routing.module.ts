import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteServicesComponent } from 'src/views/favorite-services/favorite-services.component';


const routes: Routes = [
  { path: '', redirectTo: '/favorite', pathMatch: 'full' },
  { path: 'favorite', component: FavoriteServicesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
