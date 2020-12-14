import { BehaviorSubject } from 'rxjs';
import { ICovidStoreState } from '../models/store/covid-store-state';
import { IContinentStatistic } from '../models/view/continent-stat';
import { ICountryStatistic } from '../models/view/country-stat';
import { CovidViewService } from "./covid-view.service";

describe('CovidViewService', () => {
    let covidViewService: CovidViewService;
    let covidStoreService: { covidData$: BehaviorSubject<ICovidStoreState> };

    const storeState: ICovidStoreState = {
        countryStats: {
            "Country1": {
                cases: {
                    "1M_pop": "10",
                    active: 10,
                    critical: 10,
                    new: "+10",
                    recovered: 10,
                    total: 10
                },
                continent: "Continent",
                country: "Country1",
                deaths: {
                    "1M_pop": "10",
                    new: "+10",
                    total: 10
                }
            },
            "Country2": {
                cases: {
                    "1M_pop": "20",
                    active: 20,
                    critical: 20,
                    new: "+20",
                    recovered: 20,
                    total: 20
                },
                continent: "Continent",
                country: "Country2",
                deaths: {
                    "1M_pop": "20",
                    new: "+20",
                    total: 20
                }
            }
        },
        continentStats: {
            "Continent": {
                activeCases: 30,
                casesPer1MPop: 30,
                criticalCases: 30,
                deaths: 30,
                newCases: 30,
                totalCases: 30
            }
        }
    }

    beforeEach(() => {
        covidStoreService = {covidData$: new BehaviorSubject(storeState)};
        covidViewService = new CovidViewService(covidStoreService as any);
    });

    it('should return country view data', (done) => {
        const expectedResult: ICountryStatistic[] = [
            {
                activeCases: 10,
                continent: "Continent",
                country: "Country1",
                deaths: 10,
                newCases: 10,
                percActiveOfContinent: +((10 / 30) * 100).toFixed(2),
                percDeathsOfContinent: +((10 / 30) * 100).toFixed(2),
                percNewOfContinent: +((10 / 30) * 100).toFixed(2)
            },
            {
                activeCases: 20,
                continent: "Continent",
                country: "Country2",
                deaths: 20,
                newCases: 20,
                percActiveOfContinent: +((20 / 30) * 100).toFixed(2),
                percDeathsOfContinent: +((20 / 30) * 100).toFixed(2),
                percNewOfContinent: +((20 / 30) * 100).toFixed(2)
            }
        ];

        covidViewService.getCountryData().subscribe(result => {
            expect(result).toEqual(expectedResult);
            done();
        });
    });

    it('should return continent view data', (done) => {
        const expectedResult: IContinentStatistic[] = [
            {
                activeCases: 30,
                continent: "Continent",
                deaths: 30,
                newCases: 30,
                percActiveCasesOfWorld: 100,
                percDeathsOfWorld: 100,
                percNewCasesOfWorld: 100
            },
        ];

        covidViewService.getContinentData().subscribe(result => {
            expect(result).toEqual(expectedResult);
            done();
        })
    });
});