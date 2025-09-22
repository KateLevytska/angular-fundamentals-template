import { 
    Directive, 
    HostBinding
} from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Directive({
  selector: '[passwordShown]',
  exportAs: 'passwordShown',
})
export class PasswordShownDirective {
  shown = false;
  icon: IconProp = 'eye';

  @HostBinding('attr.type')
  get type(): string {
    return this.shown ? 'text' : 'password';
  }

  changeType() {
    this.shown = !this.shown;
    if(this.shown === false) {
        this.icon= 'eye-slash'
    } else {
      this.icon = 'eye'  
    }
  }
}