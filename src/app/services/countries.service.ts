import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CovidStoreService } from './covid-store.service';

@Injectable()
export class CountriesService {

    constructor(private covidStoreService: CovidStoreService) { }

    getCountryData(): Observable<{ continent: string, country: string, newCases: Number }[]> {
        return this.covidStoreService.covidData$.pipe(
            filter(res => !!res),
            map((res) => {
                return Object.keys(res).map(country => {
                    return {
                        continent: res[country].continent,
                        country: country === res[country].continent ? '(Unassigned)' : country,
                        newCases: new Number(res[country].cases.new)
                    }
                }).sort((a, b) => (a.continent.localeCompare(b.continent) || a.country.localeCompare(b.country)));
            }));
    }

}
