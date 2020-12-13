import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewComponentBase } from '../../classes/view-component-base';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent extends ViewComponentBase implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  countryData$;

  displayedColumns = ['Continent', 'Country', 'New', 'NewPerc', 'Active', 'ActivePerc', 'Deaths', 'DeathPerc'];

  constructor(private countriesService: CountriesService) { 
    super();
  }

  ngOnInit(): void {
    this.subToCountryData();
    this.requestDataRefresh();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // Subscribes to 'store' and will return formatted observable when triggered.
  // This will update the table.
  subToCountryData() {
    this.countryData$ = this.countriesService.getCountryData().pipe(takeUntil(this.destroy$));
  }
}
