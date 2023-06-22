import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Country, CountryData, Currency } from './models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  apiBase = 'https://restcountries.com/v2/region/';

  constructor(private readonly http: HttpClient) {}

  getCountries(regionName: string): Observable<any> {
    return this.http.get(`${this.apiBase}${regionName}`).pipe(
      map((countries: Array<CountryData>) =>
        countries.map(
          ({ name, capital, population, flag, currencies }: CountryData) => ({
            name,
            capital,
            population,
            flag,
            currencies: currencies.map(({ name }: Currency) => name).join(' '),
          })
        )
      )
    );
  }
}
