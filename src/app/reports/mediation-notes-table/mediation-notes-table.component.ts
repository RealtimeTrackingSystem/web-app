import { ReporterService } from 'app/services';
import { ReportService } from './../../services/report.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of, forkJoin } from 'rxjs';
import { map, flatMap, mergeMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-mediation-notes-table',
  templateUrl: './mediation-notes-table.component.html',
  styleUrls: ['./mediation-notes-table.component.scss']
})
export class MediationNotesTableComponent implements OnInit {

  @Input() mediationNotes: any[];
  public populatedMediationNotes: any[];
  public populatedMediationNotesSubscription: Subscription;
  constructor(
    private reporterService: ReporterService
  ) { }

  ngOnInit() {
    this.populatedMediationNotesSubscription = of(this.mediationNotes)
      .pipe(
        mergeMap((mediationNotes: any) => {
          // return this.reporterService.GetReporterById(mediationNotes._reporter);
          console.log(mediationNotes);
          return forkJoin(...mediationNotes.map(m => this.populateReporter(m)))
        })
      )
      .subscribe(
        d => {
          this.populatedMediationNotes = d
        }
      );
  }

  populateReporter (mediationNote) {
    return this.reporterService.GetReporterById(mediationNote._reporter)
      .pipe(
        map(r => r.reporter),
        map(r => {
          console.log(mediationNote);
          mediationNote.link = mediationNote._media ? mediationNote._media.metaData.secure_url : '#';
          console.log(mediationNote.link);
          return {...mediationNote, _reporter: r};
        })
      )
  }

}
