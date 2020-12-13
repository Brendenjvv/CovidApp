import { NgModule } from '@angular/core';
import { MediaQueryDirective } from '../directives/media-query.directive';
import { VarDirective } from '../directives/var.directive';
import { CovidViewService } from '../services/covid-view.service';

@NgModule({
    declarations: [
        VarDirective,
        MediaQueryDirective
    ],
    exports: [
        VarDirective,
        MediaQueryDirective
    ],
    providers: [
        CovidViewService
    ]
})
export class ContentViewModule {

}