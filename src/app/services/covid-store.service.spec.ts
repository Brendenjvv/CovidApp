import { of } from 'rxjs';
import { IStatistic } from '../models/api/statistic';
import { IContinentStatStoreState } from '../models/store/continent-store-state';
import { ICountryStatStoreState } from '../models/store/country-store-state';
import { CovidStoreService } from './covid-store.service';

describe('CovidStoreService', () => {
    let covidStoreService: CovidStoreService;
    let covidDataServiceSpy: { getCountryList: jasmine.Spy, getStatistics: jasmine.Spy };

    const countriesResponse = ["Country1", "Country2"];
    const continent = "Continent";
    const statsResponse: IStatistic[] = [{
        "cases": {
            "1M_pop": "10",
            "active": 10,
            "critical": 10,
            "new": "+10",
            "recovered": 10,
            "total": 10
        },
        continent,
        "country": countriesResponse[0],
        "day": "2020-10-10",
        "deaths": {
            "1M_pop": "10",
            "new": "+10",
            "total": 10
        },
        "tests": {
            "1M_pop": "10",
            total: 10
        },
        "time": "atime"
    },
    {
        "cases": {
            "1M_pop": "20",
            "active": 20,
            "critical": 20,
            "new": "+20",
            "recovered": 20,
            "total": 20
        },
        continent,
        "country": countriesResponse[1],
        "day": "2020-10-10",
        "deaths": {
            "1M_pop": "20",
            "new": "+20",
            "total": 20
        },
        "tests": {
            "1M_pop": "20",
            total: 20
        },
        "time": "atime"
    }];

    beforeEach(() => {
        covidDataServiceSpy = jasmine.createSpyObj('CovidDataService', ["getCountryList", "getStatistics"]);
        covidStoreService = new CovidStoreService(covidDataServiceSpy as any);
    });

    it('should populate store', (done) => {
        const expectedCountryStats: { [key: string]: ICountryStatStoreState } = {
            [statsResponse[0].country]: {
                cases: {
                    "1M_pop": statsResponse[0].cases["1M_pop"],
                    active: statsResponse[0].cases.active,
                    critical: statsResponse[0].cases.critical,
                    new: statsResponse[0].cases.new,
                    recovered: statsResponse[0].cases.recovered,
                    total: statsResponse[0].cases.total
                },
                continent: statsResponse[0].continent,
                country: statsResponse[0].country,
                deaths: {
                    "1M_pop": statsResponse[0].deaths["1M_pop"],
                    new: statsResponse[0].deaths.new,
                    total: statsResponse[0].deaths.total
                }
            },
            [statsResponse[1].country]: {
                cases: {
                    "1M_pop": statsResponse[1].cases["1M_pop"],
                    active: statsResponse[1].cases.active,
                    critical: statsResponse[1].cases.critical,
                    new: statsResponse[1].cases.new,
                    recovered: statsResponse[1].cases.recovered,
                    total: statsResponse[1].cases.total
                },
                continent: statsResponse[1].continent,
                country: statsResponse[1].country,
                deaths: {
                    "1M_pop": statsResponse[1].deaths["1M_pop"],
                    new: statsResponse[1].deaths.new,
                    total: statsResponse[1].deaths.total
                }
            }
        }

        const expectedContinentStats: { [key: string]: IContinentStatStoreState } = {
            [continent]: {
                activeCases: 30,
                casesPer1MPop: 30,
                criticalCases: 30,
                deaths: 30,
                newCases: 30,
                totalCases: 30
            }
        }

        covidDataServiceSpy.getCountryList.and.returnValue(of(countriesResponse));
        covidDataServiceSpy.getStatistics.and.returnValue(of(statsResponse));

        expect(covidStoreService.covidData$.getValue()).toBeUndefined();

        covidStoreService.covidData$.subscribe((state) => {
            if (state) {
                expect(Object.assign({}, state.countryStats)).toEqual(Object.assign({}, expectedCountryStats));
                expect(Object.assign({}, state.continentStats)).toEqual(Object.assign({}, expectedContinentStats));
                done();
            }
        });

        covidStoreService.updateStore();

    });
});
