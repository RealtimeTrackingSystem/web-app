
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { ISession } from 'app/interface/session/session.interface';
import { SessionService } from '../services/session.service';

@Pipe({
  name: 'translation'
})
export class TranslationPipe implements PipeTransform {
  constructor (
    private sessionService: SessionService
  ) {}
  GetTranslation (id, languageString: string = null) {
  }
  transform(value: any, languageString?: any): any {
    return value;
  }

}
