import { ICases } from './api/cases';
import { IDeaths } from './api/deaths';

export interface CovidStoreState {
    [key: string]: {
        continent: string,
        cases: ICases,
        deaths: IDeaths
    }
}
