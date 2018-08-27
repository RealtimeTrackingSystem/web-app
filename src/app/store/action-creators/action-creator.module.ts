import { NgModule, ModuleWithProviders } from '@angular/core';

import { SessionActionCreator } from './session.actioncreator';
import { ReportActionCreator } from './report.actioncreator';
import { ReporterActionCreator } from './reporter.actioncreator';
import { UserDataActionCreator } from './user-data.actioncreator';

@NgModule({
  imports: [],
  declarations: []
})
export class ActionCreatorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ActionCreatorModule,
      providers: [
        SessionActionCreator,
        ReportActionCreator,
        ReporterActionCreator,
        UserDataActionCreator
      ]
    }
  }
}
