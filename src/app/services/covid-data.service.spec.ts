import { CovidDataService } from "./covid-data.service";
import { of } from 'rxjs';
import { IStatistic } from '../models/api/statistic';

describe('CovidDataService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let covidDataService: CovidDataService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        covidDataService = new CovidDataService(httpClientSpy as any);
    });

    it('should get country list', () => {
        const apiResponse = {
            errors: [],
            get: "countries",
            parameters: [],
            results: 2,
            response: ["Country1", "Country2"]
        }

        httpClientSpy.get.and.returnValue(of(apiResponse));

        covidDataService.getCountryList().subscribe(countries => {
            expect(countries).toEqual(apiResponse.response, 'expected countries');
        });

        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should get statistics', () => {
        const apiResponse = {
            errors: [],
            get: "statistics",
            parameters: [],
            results: 1,
            response: [{
                "cases" : {
                    "1M_pop": "1234",
                    "active": 8888,
                    "critical": 123,
                    "new": "+60",
                    "recovered": 555,
                    "total": 12345
                },
                "continent": "Continent",
                "country": "Country",
                "day": "2020-10-10",
                "deaths": {
                    "1M_pop": "888",
                    "new": "+62",
                    "total": 333
                },
                "population": 1,
                "tests": {
                    "1M_pop": "5871",
                    total: 66995
                },
                "time": "atime"
            }]
        }

        httpClientSpy.get.and.returnValue(of(apiResponse));

        covidDataService.getStatistics().subscribe(stats => {
            expect(stats).toEqual(apiResponse.response as IStatistic[] , 'expected statistics');
        });

        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
});
