import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IStatistic } from '../models/api/statistic';
import { ICountryStatStoreState } from '../models/store/country-store-state';
import { ICovidStoreState } from '../models/store/covid-store-state';
import { IContinentStatStoreState } from '../models/store/continent-store-state';
import { CovidService } from './covid.service';

@Injectable({
    providedIn: 'root'
})
export class CovidStoreService {

    // Used a subject to simulate a store. Wasn't sure if I could use @ngrx/store since the spec calls for native angular libs. 
    covidData$ = new BehaviorSubject<ICovidStoreState>(undefined);

    constructor(private covidService: CovidService) { }

    updateStore() {
        const countries$ = this.covidService.getCountryList(); 
        const stats$ = this.covidService.getStatistics();

        const statResult$ = forkJoin([countries$, stats$]).pipe(
            tap((res) => {
                this.covidData$.next(this.populateStore(res[0], res[1]));
            }))
            .subscribe(() => {
                statResult$.unsubscribe();
            });
    }

    private populateStore(countries: string[], stats: IStatistic[]) {
        let state: ICovidStoreState = {};
        if (countries && stats) {
            let countryStats: { [key: string]: ICountryStatStoreState } = {};
            let continentStats: { [key: string]: IContinentStatStoreState } = {};

            countries.forEach(country => {
                const countryStat = stats.find(s => s.country === country);
                if (countryStat && countryStat.continent) {
                    const continent = countryStat.continent;
                    countryStats[country] = {
                        cases: countryStat.cases,
                        continent,
                        country,
                        deaths: countryStat.deaths
                    };

                    if (!continentStats[continent]) continentStats[continent] = {
                        activeCases: 0,
                        casesPer1MPop: 0,
                        criticalCases: 0,
                        deaths: 0,
                        newCases: 0,
                        totalCases: 0
                    };

                    continentStats[continent].activeCases += countryStat.cases.active;
                    continentStats[continent].casesPer1MPop += Number(countryStat.cases["1M_pop"]);
                    continentStats[continent].criticalCases += countryStat.cases.critical;
                    continentStats[continent].deaths += countryStat.deaths.total;
                    continentStats[continent].newCases += Number(countryStat.cases.new);
                    continentStats[continent].totalCases += countryStat.cases.total;
                }
            })

            state.continentStats = continentStats;
            state.countryStats = countryStats;
        }
        return state;
    }
}
