import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IStatistic } from '../models/api/statistic';

@Injectable({
    providedIn: 'root'
})
export class CovidService {

    private rapidApiHost = "covid-193.p.rapidapi.com";

    private defaultHeaders: { [key: string]: string };

    constructor(private httpService: HttpClient) {
        this.defaultHeaders = {
            "X-RapidAPI-Key": "9fdc1f1e76msh3524d274b4429edp1a988ajsn7d54c7ad9041",
            "X-RapidAPI-Host": this.rapidApiHost
        };
    }

    getCountryList(): Observable<string[]> {
        return this.httpService.get(`https://${this.rapidApiHost}/countries`, {
            headers: this.defaultHeaders
        }).pipe(
            map((result: any) => result.response as string[])
        );
    }

    getStatistics(): Observable<IStatistic[]> {
        return this.httpService.get(`https://${this.rapidApiHost}/statistics`, {
            headers: this.defaultHeaders
        }).pipe(
            map((result: any) => result.response as IStatistic[])
        );
    }
}