import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { VarDirective } from 'src/app/directives/var.directive';
import { ContentViewModule } from 'src/app/modules/content-view-module';
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
        MatProgressSpinnerModule
    ],
    providers: [
        ContinentsService
    ]
})
export class ContinentsModule {

}