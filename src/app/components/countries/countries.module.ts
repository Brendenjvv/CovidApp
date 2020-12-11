import { NgModule } from '@angular/core';
import { CountriesComponent } from './countries.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [
        CountriesComponent
    ],
    imports: [
        MatTableModule
    ]
})
export class CountriesModule { }