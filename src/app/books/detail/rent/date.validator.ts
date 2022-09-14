import { AbstractControl } from '@angular/forms';
import * as moment from 'moment/moment';

export function dateValidator(control: AbstractControl) {
  const date = control.value;
  let dateNow = moment().format('YYYY-MM-DD');
  if (date <= dateNow) {
    return { dateIs: true };
  } else {
    return null;
  }
}
