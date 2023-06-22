import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import * as AppActions from "./state/app.actions";
import { Country } from "./models/country.model";
import { DropdownChangeValue } from "./models/select.model";
import {
  getCountries,
  getRegions,
  getSelectedCountry,
  getSelectedRegion,
} from "./state/app.selectors";
import { Region } from "./models/region.model";
import { State } from "./state/app.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testApplication';
  regions$: Observable<Array<Region>> ;
  countries$: Observable<Array<Country>>;
  selectedRegion$: Observable<Region>;
  selectedCountry$: Observable<Country>;
  constructor(
    private  store: Store<State>
  ) {
    this.regions$ = this.store.select(getRegions);
    this.countries$= this.store.select(getCountries);
    this.selectedRegion$=this.store.select(getSelectedRegion);
    this.selectedCountry$ = this.store.select(getSelectedCountry);

  }

  handleOptionChange({ label, value }: DropdownChangeValue) {
    if (label === "Regions") {
      this.store.dispatch(AppActions.selectRegion({ selectedRegion: value }))
      this.store.dispatch(AppActions.loadCountries({ selectedRegion: value}))
    } else {
      this.store.dispatch(AppActions.selectCountry({ selectedCountry: value }));
    }
  }
}
