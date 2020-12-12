import { ICountryStatStoreState } from './country-store-state';
import { IContinentStatStoreState } from './continent-store-state';

export interface ICovidStoreState {
    countryStats?: {
        [key: string]: ICountryStatStoreState
    },
    continentStats?: {
        [key: string]: IContinentStatStoreState
    }
}
