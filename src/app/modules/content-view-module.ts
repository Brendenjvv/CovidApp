import { NgModule } from '@angular/core';
import { VarDirective } from '../directives/var.directive';

@NgModule({
    declarations: [
        VarDirective
    ],
    exports: [
        VarDirective
    ]
})
export class ContentViewModule {

}