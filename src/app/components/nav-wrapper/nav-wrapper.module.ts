import { NgModule } from '@angular/core';
import { ContinentsComponent } from '../continents/continents.component';
import { NavWrapperComponent } from './nav-wrapper.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { NavWrapperRoutingModule } from './nav-wrapper.routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        ContinentsComponent,
        ContinentsComponent,
        NavWrapperComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        NavWrapperRoutingModule,
        MatToolbarModule,
        MatButtonModule
    ],
    exports: [
        NavWrapperComponent
    ]

})
export class NavWrapperModule {

}