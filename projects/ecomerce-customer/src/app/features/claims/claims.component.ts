import { Component } from '@angular/core';
import { isNullOrUndefined } from '../../../../../services/src/public-api';

@Component({
  selector: 'app-claims',
  standalone: false,
  templateUrl: './claims.component.html',
  styleUrl: './claims.component.scss'
})
export class ClaimsComponent {
  isSucces: boolean = false;
  model: ModelForm = {}
  submitted: boolean = false;

  sendMenssage() {
    this.submitted = true;
    if (this.validatorFormNew()) {
      return;
    }
    this.submitted = false;
    setTimeout(() => {
      this.isSucces=true;
    }, 1000)
  }
  validatorFormNew() {
    let state = false;
    state = (isNullOrUndefined(this.model.name) || isNullOrUndefined(this.model.lastName)
      || isNullOrUndefined(this.model.email) || isNullOrUndefined(this.model.number) ||
      isNullOrUndefined(this.model.message)
    );
    return state;
  }
}
interface ModelForm {
  name?: string;
  lastName?: string;
  email?: string;
  number?: string;
  message?: string;
}
