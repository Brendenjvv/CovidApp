import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class ViewComponentBase {
    refreshRequested$: Subject<boolean>;
    destroy$: Subject<boolean>;

    constructor() {
        this.refreshRequested$ = new Subject<boolean>();
        this.destroy$ = new Subject<boolean>();
    }

    public requestDataRefresh() {
        this.refreshRequested$.next(true);
    }

    public destroy(){
        this.destroy$.next(true);
        this.destroy$ = null;
    }
}
