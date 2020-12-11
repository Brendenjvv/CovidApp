
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewComponentBase } from '../../classes/view-component-base';
import { CovidStoreService } from '../../services/covid-store.service';

@Component({
  selector: 'nav-wrapper',
  templateUrl: './nav-wrapper.component.html',
  styleUrls: ['./nav-wrapper.component.scss']
})
export class NavWrapperComponent implements OnInit {
  refreshSub$: Subscription;

  constructor(private covidStoreService: CovidStoreService) { }

  ngOnInit(): void {
  }

  onActivate(event) {
    if (event instanceof ViewComponentBase) {
      this.refreshSub$ = event.onRefreshRequested.subscribe(() => this.refreshStoreData());
    }
  }

  onDeactivate() {
    if (this.refreshSub$) {
      this.refreshSub$.unsubscribe();
    }
  }

  refreshStoreData() {
    this.covidStoreService.updateStore()
  }
}
