import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ContentViewModule } from '../../modules/content-view-module';
import { CountriesComponent } from './countries.component';

@NgModule({
    declarations: [
        CountriesComponent
    ],
    imports: [
        ContentViewModule,
        CommonModule,
        MatTableModule,
        MatCardModule,
        MatListModule
    ]
})
export class CountriesModule { }