import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStatistic } from '../models/api/statistic';
import { DatePipe } from '@angular/common'

@Injectable({
    providedIn: 'root'
})
export class CovidService {

    private rapidApiHost = "covid-193.p.rapidapi.com";

    private defaultHeaders: { [key: string]: string };

    constructor(private httpService: HttpClient) {
        // Ideally these details shouldn't be here. Spec calls for no changes to be made to get it running. 
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

    getLatestWorldStatistics(): Observable<IStatistic[]> {
        const datePipe = new DatePipe('en-US');
        return this.httpService.get(`https://${this.rapidApiHost}/history`, {
            headers: this.defaultHeaders,
            params: {
                country: "all",
                day: datePipe.transform(new Date(), 'yyyy-MM-dd')
            }
        }).pipe(
            map((result: any) => result.response as IStatistic[])
        );
    }
}