import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() buttonNgClass?: string | string[] | Set<string> | { [cssClass: string]: boolean };
  @Input() iconName?: IconProp;
  @Input() type?: string;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}