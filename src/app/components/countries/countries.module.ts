import { NgModule } from '@angular/core';
import { CountriesComponent } from './countries.component';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../../services/countries.service';
import { VarDirective } from 'src/app/directives/var.directive';

@NgModule({
    declarations: [
        CountriesComponent,
        VarDirective
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatProgressSpinnerModule
    ],
    providers: [
        CountriesService
    ]
})
export class CountriesModule { }