import { ReportActionCreator } from './../../../store/action-creators/report.actioncreator';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { IReport } from '../../../interface';

@Component({
  selector: 'app-report-detail-view',
  templateUrl: './report-detail-view.component.html',
  styleUrls: ['./report-detail-view.component.scss']
})
export class ReportDetailViewComponent implements OnInit {

  @select(s => s.report.reportDetails) $report: Observable<IReport>;

  constructor(
    private reportActionCreator: ReportActionCreator,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      flatMap(result => {
        return this.reportActionCreator.GetReportDetails(result._reportId);
      })
    ).toPromise()
    .then();
  }

}
