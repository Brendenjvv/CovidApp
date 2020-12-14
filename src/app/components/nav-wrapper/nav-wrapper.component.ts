import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewComponentBase } from '../../classes/view-component-base';
import { CovidStoreService } from '../../services/covid-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'nav-wrapper',
  templateUrl: './nav-wrapper.component.html',
  styleUrls: ['./nav-wrapper.component.scss']
})
export class NavWrapperComponent implements OnInit, OnDestroy {
  busy$: Observable<boolean>;
  deactivated$: Subject<boolean> = new Subject();
  storeError$: Subscription;

  constructor(
    private covidStoreService: CovidStoreService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.busy$ = this.covidStoreService.loading$;
    this.storeError$ = this.covidStoreService.error$.subscribe(err => {
      const errMessage = 'An error occurred while fetching data.';
      console.error(errMessage, err);
      this.showError(errMessage);
    });
  }

  ngOnDestroy(): void {
    this.busy$ = null;
    this.deactivated$.next(true);
    this.deactivated$ = null;
    if (this.storeError$) {
      this.storeError$.unsubscribe();
    }
    this.storeError$ = null;

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

  showError(errMessage: string) {
    this.snackBar.open(errMessage, 'Dismiss', {
      duration: 5000
    })
  }
}
