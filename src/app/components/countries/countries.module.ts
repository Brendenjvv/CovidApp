import { NgModule } from '@angular/core';
import { CountriesComponent } from './countries.component';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../../services/countries.service';
import { ContentViewModule } from 'src/app/modules/content-view-module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@NgModule({
    declarations: [
        CountriesComponent
    ],
    imports: [
        ContentViewModule,
        CommonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatListModule
    ],
    providers: [
        CountriesService
    ]
})
export class CountriesModule { }