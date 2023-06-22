import { Injectable } from '@angular/core';

import { mergeMap, switchMap,map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CountriesService } from '../countries.service';
import * as AppActions from './app.actions';
import {Country} from "../models/country.model";
export abstract class Wrapper {
  constructor(protected readonly actions$: Actions) {}
}
@Injectable()
export class AppEffects  extends Wrapper {
  constructor(actions$: Actions,private  countriesService: CountriesService) {
    super(actions$);
  }

  loadCountries$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AppActions.loadCountries),
        mergeMap((action) => this.countriesService.getCountries(action.selectedRegion)
          .pipe(
            map(countries => AppActions.loadCountriesSuccess({ countries })),
            catchError(error => of(AppActions.loadCountriesFailure({ error })))
          )
        )
      );
  });
}
