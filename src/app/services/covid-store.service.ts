import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IStatistic } from '../models/api/statistic';
import { CovidStoreState } from '../models/covid-store-state';
import { CovidService } from './covid.service';

@Injectable({
    providedIn: 'root'
})
export class CovidStoreService {

    // Used a subject to simulate a store. Wasn't sure if I could use @ngrx/store since the spec calls for native angular libs. 
    covidData$ = new Subject<CovidStoreState>();

    constructor(private covidService: CovidService) {}

    updateStore() {
        this.covidData$.next({});
        const statResult$ = this.covidService.getStatistics()
        .subscribe((res) => {
            this.covidData$.next(this.formatStatData(res));
            statResult$.unsubscribe();
        });
    }

    private formatStatData(stats: IStatistic[]): CovidStoreState {
        const state: CovidStoreState = {};
        if(stats){
            stats.forEach(stat => {
                state[stat.country] = {
                    continent: !stat.continent ? "Unknown" : stat.continent,
                    cases: stat.cases,
                    deaths: stat.deaths
                }
            });
        }
        return state;
    }
}
