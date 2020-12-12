export interface ICountryStatistic {
    country?:string,
    continent?:string,
    newCases?: number,
    percNewOfContinent?: number,
    activeCases? : number,
    percActiveOfContinent?: number,
    deaths? :number,
    percDeathsOfContinent?: number
}
