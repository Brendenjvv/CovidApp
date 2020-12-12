import { NgModule } from '@angular/core';
import { ContinentsComponent } from '../continents/continents.component';
import { NavWrapperComponent } from './nav-wrapper.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavWrapperRoutingModule } from './nav-wrapper.routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CountriesModule } from '../countries/countries.module';
import { ContinentsModule } from '../continents/continents.module';
import { VarDirective } from 'src/app/directives/var.directive';

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
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        NavWrapperComponent
    ]
})
export class NavWrapperModule { }