import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, delayWhen, takeUntil } from 'rxjs/operators';
import { ViewComponentBase } from '../../classes/view-component-base';
import { CovidStoreService } from '../../services/covid-store.service';

@Component({
  selector: 'nav-wrapper',
  templateUrl: './nav-wrapper.component.html',
  styleUrls: ['./nav-wrapper.component.scss']
})
export class NavWrapperComponent implements OnInit, OnDestroy {
  busy$: Observable<boolean>;
  deactivated$: Subject<boolean> = new Subject();

  constructor(private covidStoreService: CovidStoreService) { }

  ngOnInit(): void {
    this.busy$ = this.covidStoreService.loading$;
  }

  ngOnDestroy(): void {
    this.busy$ = null;
    this.deactivated$.next(true);
    this.deactivated$ = null;
  }

  onActivate(event) {
    if (event instanceof ViewComponentBase) {
      event.refreshRequested$.pipe(takeUntil(this.deactivated$)).subscribe(() => this.refreshStoreData(false));
    }
  }

  onDeactivate() {
    this.deactivated$.next(true);
  }

  refreshStoreData(force = true) {
    this.covidStoreService.updateStore(force);
  }
}
