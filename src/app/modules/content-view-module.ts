import { NgModule } from '@angular/core';
import { MediaQueryDirective } from '../directives/media-query.directive';
import { VarDirective } from '../directives/var.directive';

@NgModule({
    declarations: [
        VarDirective,
        MediaQueryDirective
    ],
    exports: [
        VarDirective,
        MediaQueryDirective
    ]
})
export class ContentViewModule {

}