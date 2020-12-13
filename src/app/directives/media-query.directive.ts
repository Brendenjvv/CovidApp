import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[mediaQuery]'
})
export class MediaQueryDirective {

    @Input()
    set mediaQuery(query: string) {
        this.removeListener && this.removeListener();
        this.setupMediaQueryListener(query);
    }

    private hasView = false;
    private removeListener: () => void;

    constructor(private vc: ViewContainerRef, private template: TemplateRef<any>) { }

    private setupMediaQueryListener(mediaQuery: string) {

        if (window) {
            const mqList = window.matchMedia(mediaQuery);
            const queryListener = (e) => {
                if (e.matches && !this.hasView) {
                    this.hasView = true;
                    this.vc.createEmbeddedView(this.template);
                }

                if (!e.matches && this.hasView) {
                    this.hasView = false;
                    this.vc.clear();
                }
            };

            queryListener(mqList);
            mqList.addEventListener('change', queryListener);

            this.removeListener = () => mqList.removeEventListener('change', queryListener);
        }
    }
}