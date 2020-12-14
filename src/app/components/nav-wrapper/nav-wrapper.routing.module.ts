import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContinentsComponent } from '../continents/continents.component';
import { CountriesComponent } from '../countries/countries.component';

export const routes: Routes = [{
    path: 'countries',
    component: CountriesComponent
},
{
    path: 'continents',
    component: ContinentsComponent
},
{
    path: '',
    pathMatch: 'full',
    redirectTo: '/continents'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NavWrapperRoutingModule {

}