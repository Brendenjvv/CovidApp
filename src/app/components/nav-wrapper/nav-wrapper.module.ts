import { NgModule } from '@angular/core';
import { NavWrapperComponent } from './nav-wrapper.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavWrapperRoutingModule } from './nav-wrapper.routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CountriesModule } from '../countries/countries.module';
import { ContinentsModule } from '../continents/continents.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        NavWrapperComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        CountriesModule,
        ContinentsModule,
        NavWrapperRoutingModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        NavWrapperComponent
    ]
})
export class NavWrapperModule { }