import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IContinentStatistic } from '../models/view/continent-stat';
import { ICountryStatistic } from '../models/view/country-stat';
import { CovidStoreService } from './covid-store.service';

@Injectable()
export class CovidViewService {

    constructor(private covidStoreService: CovidStoreService) { }

    /*
     Gets continent data from store, calculates percentages relative to world and
     formats for display.
    */
    getContinentData(): Observable<IContinentStatistic[]> {
        return this.covidStoreService.covidData$.pipe(
            filter(res => (!!res && !!res.countryStats && !!res.continentStats)),
            map(res => {
                let totalWorldNewCases = 0;
                let totalWorldActiveCases = 0;
                let totalWorldDeaths = 0;

                Object.values(res.continentStats).forEach(continent => {
                    totalWorldActiveCases += continent.activeCases;
                    totalWorldNewCases += continent.newCases;
                    totalWorldDeaths += continent.deaths;
                });

                return Object.keys(res.continentStats).map(continent => {
                    const activeCases = res.continentStats[continent].activeCases;
                    const newCases = res.continentStats[continent].newCases;
                    const deaths = res.continentStats[continent].deaths;

                    const percNewCasesOfWorld = (newCases / totalWorldNewCases) * 100;
                    const percActiveCasesOfWorld = (activeCases / totalWorldActiveCases) * 100;
                    const percDeathsOfWorld = (deaths / totalWorldDeaths) * 100;

                    return {
                        continent,
                        activeCases,
                        newCases,
                        deaths,
                        percNewCasesOfWorld: +(percNewCasesOfWorld.toFixed(2)),
                        percActiveCasesOfWorld: +(percActiveCasesOfWorld.toFixed(2)),
                        percDeathsOfWorld: +(percDeathsOfWorld.toFixed(2))
                    } as IContinentStatistic;
                }).sort((a,b) => a.continent.localeCompare(b.continent));
            })
        )
    }

    /*
     Gets country data from store, calculates percentages relative to continent and
     formats for display.
    */
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