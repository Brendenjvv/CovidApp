import { ICases } from './cases';
import { IDeaths } from './deaths';
import { ITests } from './tests';

export interface IStatistic {
    cases: ICases,
    continent: string
    country: string,
    day: string,
    deaths: IDeaths,
    tests: ITests
    time: string
}
