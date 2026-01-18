import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../common/country';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../common/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Luv2ShopFormService {
  private countriesUrl = environment['luv2shopApiUrl'] + '/countries';
  private statessUrl = environment['luv2shopApiUrl'] + '/states';
  constructor(private httpClient: HttpClient) {}

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }

  getCountries(): Observable<Country[]> {
    // let countriesUrl = `${this.baseUrl}/countries`;
    return this.httpClient
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map((data) => data._embedded.countries));
  }

  getStates(countryCode: string): Observable<State[]> {
    // let statesUrl = `${this.baseUrl}/states/search/findByCountryCode?code=${countryCode}`;
    let searchUrl = `${this.statessUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient
      .get<GetResponseStates>(searchUrl)
      .pipe(map((data) => data._embedded.states));
  }
}
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}
interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
