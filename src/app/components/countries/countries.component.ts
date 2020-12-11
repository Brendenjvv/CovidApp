import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CovidStoreService } from '../../services/covid-store.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  displayedColumns = ['Continent', 'Country', 'New'];

  constructor(private covidStoreService: CovidStoreService) { }

  ngOnInit(): void {
    // NgRx action equivalent. 
    this.covidStoreService.updateStore();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // Subscribes to 'store' and will return formatted observable when triggered.
  // This will update the table.
  // Sorted by continent asc.
  getCountryData() {
    return this.covidStoreService.covidData$.pipe(
      takeUntil(this.destroy$),
      map((res) => {
        return Object.keys(res).map(country => {
          return {
            continent: res[country].continent,
            country,
            new: new Number(res[country].cases.new)
          }
        }).sort((a, b) => (a.continent.localeCompare(b.continent)));
      }));
  }

}
