import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

import { Country } from "../../models/country.model";
import { DropdownChangeValue } from "../../models/select.model";
import {Region} from "../../models/region.model";


@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionsComponent {
  @Input() label: string;
  @Input() optionsList: Array<Region | Country>;
  @Input() defaultSelection: Region | Country;
  @Output() optionChange = new EventEmitter<DropdownChangeValue>();
  defaultSelectionForSelct:any;

  onOptionChange(value) {
    this.optionChange.emit({
      label: this.label,
      value
    });
  }
}
