import { NgIf } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICountryStatistic } from '../models/view/country-stat';
import { CovidStoreService } from './covid-store.service';

@Injectable()
export class CountriesService {

    constructor(private covidStoreService: CovidStoreService) { }

    getCountryData(): Observable<ICountryStatistic[]> {
        return this.covidStoreService.covidData$.pipe(
            filter(res => (!!res && !!res.countryStats && !!res.continentStats)),
            map(res => {
                return Object.keys(res.countryStats).map(country => {
                    const countryData = res.countryStats[country];
                    const continent = countryData.continent;
                    const activeCases = countryData.cases.active;
                    const deaths = countryData.deaths.total;
                    const newCases =  Number(countryData.cases.new);
                    const percActiveOfContinent = activeCases / res.continentStats[continent].activeCases * 100;
                    const percDeathsOfContinent = deaths / res.continentStats[continent].deaths * 100;
                    const percNewOfContinent = newCases / res.continentStats[continent].newCases * 100;
                    return {
                        country,
                        continent,
                        activeCases,
                        deaths,
                        newCases,
                        percActiveOfContinent: +(percActiveOfContinent.toFixed(2)),
                        percDeathsOfContinent: +(percDeathsOfContinent.toFixed(2)),
                        percNewOfContinent: +(percNewOfContinent.toFixed(2))
                    } as ICountryStatistic;
                }).sort((a,b) => a.country.localeCompare(b.country) && a.continent.localeCompare(b.continent))
            })
        )
    }

}
