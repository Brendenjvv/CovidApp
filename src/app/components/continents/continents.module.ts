import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ContentViewModule } from '../../modules/content-view-module';
import { ContinentsComponent } from './continents.component';

@NgModule({
    declarations: [
        ContinentsComponent
    ],
    imports: [
        ContentViewModule,
        CommonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatListModule
    ]
})
export class ContinentsModule { }
