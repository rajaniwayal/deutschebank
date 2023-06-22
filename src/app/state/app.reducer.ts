import { createReducer, on } from "@ngrx/store";
import {Country, CountryData} from "../models/country.model";
import { Region } from "../models/region.model";
import * as AppActions from "./app.actions";
import { State } from "./app.state";


const initialState: State = {
  selectedCountry: null,
  regions: [{ name: "Asia" }, { name: "Europe" }],
  selectedRegion: null,
  countries: null,
  error: null
};


export const appReducer = createReducer<State>(
  initialState,
  on(
    AppActions.selectRegion,
    (state=initialState, action): State => {
      return {
        ...state,
        selectedRegion: state.regions.find(({ name }: Region) => name === action.selectedRegion),
        selectedCountry: null,
      };
    }
  ),
  on(
    AppActions.selectCountry,
    (state, action): State => {
      return {
        ...state,
        selectedCountry: state.countries.find(({ name }: Country) => name === action.selectedCountry)
      };
    }
  ),
  on(
    AppActions.loadCountriesSuccess,
    (state, action): State => {
      return {
        ...state,
        countries: action.countries,
        selectedCountry: null,
        error: null,
      };
    }
  ),
  on(
    AppActions.loadCountriesFailure,
    (state, action): State => {
      return {
        ...state,
        countries: [],
        selectedCountry: null,
        error: action.error
      };
    }
  )
);
