import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ContentViewModule } from '../../modules/content-view-module';
import { ContinentsService } from '../../services/continents.service';
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
    ],
    providers: [
        ContinentsService
    ]
})
export class ContinentsModule {

}