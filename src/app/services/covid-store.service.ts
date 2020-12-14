import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Subject, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { IStatistic } from '../models/api/statistic';
import { ICountryStatStoreState } from '../models/store/country-store-state';
import { ICovidStoreState } from '../models/store/covid-store-state';
import { IContinentStatStoreState } from '../models/store/continent-store-state';
import { CovidDataService } from './covid-data.service';

@Injectable({
    providedIn: 'root'
})
export class CovidStoreService {

    // Used a subject to simulate a store. Wasn't sure if I could use @ngrx/store since the spec calls for native angular libs. 
    covidData$ = new BehaviorSubject<ICovidStoreState>(undefined);
    loading$ = new BehaviorSubject<boolean>(false);
    error$ = new Subject<string>();

    constructor(private covidService: CovidDataService) { }

    updateStore(forceUpdate = false) {
        const currentVal = this.covidData$.getValue();

        // Added a check for data age to prevent api spamming on navigation.
        // Data older than 1 minute is considered stale.
        // Hitting the refresh button will force the update.
        if (currentVal && currentVal.lastRefresh && !forceUpdate) {
            const minDiff = Math.round(((new Date()).getTime() - currentVal.lastRefresh.getTime()) / 60000);
            if (minDiff < 1) return;
        }

        const countries$ = this.covidService.getCountryList();
        const stats$ = this.covidService.getStatistics();

        this.loading$.next(true);
        const statResult$ = forkJoin([countries$, stats$]).pipe(
            catchError((err,caught) => {
                this.error$.next(err);
                return throwError(err);
            }),
            tap((res) => {
                this.covidData$.next(this.populateStore(res[0], res[1]));
            }),
            finalize(() => this.loading$.next(false))).subscribe();
    }

    private populateStore(countries: string[], stats: IStatistic[]) {
        let state: ICovidStoreState = {
            lastRefresh: new Date()
        };
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
