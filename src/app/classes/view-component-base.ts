import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class ViewComponentBase {
    onRefreshRequested: Subject<boolean>;

    constructor() {
        this.onRefreshRequested = new Subject();
    }
    

    public requestDataRefresh() {
        this.onRefreshRequested.next();
    }
}
