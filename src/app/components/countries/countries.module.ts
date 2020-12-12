import { NgModule } from '@angular/core';
import { CountriesComponent } from './countries.component';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../../services/countries.service';
import { ContentViewModule } from 'src/app/modules/content-view-module';

@NgModule({
    declarations: [
        CountriesComponent
    ],
    imports: [
        ContentViewModule,
        CommonModule,
        MatTableModule,
        MatProgressSpinnerModule
    ],
    providers: [
        CountriesService
    ]
})
export class CountriesModule { }