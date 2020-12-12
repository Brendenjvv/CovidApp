import { ICases } from '../api/cases';
import { IDeaths } from '../api/deaths';

export interface ICountryStatStoreState {
        country?: string,
        continent?: string,
        cases?: ICases,
        deaths?: IDeaths
}
