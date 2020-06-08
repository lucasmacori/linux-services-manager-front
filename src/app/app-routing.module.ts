import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteServicesComponent } from 'src/views/favorite-services/favorite-services.component';
import { ServicesComponent } from 'src/views/services/services.component';


const routes: Routes = [
  { path: '', redirectTo: '/favorite', pathMatch: 'full' },
  { path: 'favorite', component: FavoriteServicesComponent },
  { path: 'services', component: ServicesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
