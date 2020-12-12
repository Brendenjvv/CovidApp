import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IContinentStatistic } from '../models/view/continent-stat';
import { CovidStoreService } from './covid-store.service';

@Injectable()
export class ContinentsService {

    constructor(private covidStoreService: CovidStoreService) {

    }

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

}