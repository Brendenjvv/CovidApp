import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewComponentBase } from '../../classes/view-component-base';
import { CovidViewService } from '../../services/covid-view.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent extends ViewComponentBase implements OnInit, OnDestroy {
  countryData$;
  displayedColumns = ['Continent', 'Country', 'New', 'NewPerc', 'Active', 'ActivePerc', 'Deaths', 'DeathPerc'];

  constructor(private viewService: CovidViewService) { 
    super();
  }

  ngOnInit(): void {
    this.subToCountryData();
    this.requestDataRefresh();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  // Subscribes to 'store' and will return formatted observable when triggered.
  // This will update the table.
  subToCountryData() {
    this.countryData$ = this.viewService.getCountryData().pipe(takeUntil(this.destroy$));
  }
}
