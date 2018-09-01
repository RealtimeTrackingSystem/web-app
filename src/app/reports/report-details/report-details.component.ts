import { IReport } from './../../interface';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit, OnChanges {

  @Input() report: IReport;
  public reportDetails = 'Report Details';
  public reportDetailForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.reportDetailForm = this.formBuilder.group({
      _id: [{ value: null, disabled: true }],
      title: [{ value: null, disabled: true}],
      description: [{ value: null, disabled: true}],
      location: [{ value: null, disabled: true}],
      long:  [{ value: null, disabled: true}],
      lat: [{ value: null, disabled: true }],
      _reporter: [{ value: null, disabled: true }],
      _host: [{ value: null, disabled: true }],
      status: [{ value: null, disabled: true }],
      people: [{ value: null, disabled: true }],
      properties: [{ value: null, disabled: true }],
      medias: [{ value: null, disabled: true }],
      tags: [{ value: null, disabled: true }],
      createdAt: [{ value: null, disabled: true }],
      updatedAt: [{ value: null, disabled: true }]
    });
  }

  ngOnInit() {

  }

  ngOnChanges (changes) {
    if (this.report) {
      this.loadReportDetails(this.report);
    }
  }

  loadReportDetails (report: IReport) {
    console.log(report);
    this.reportDetailForm = this.formBuilder.group({
      _id: [{ value: report._id, disabled: true }, Validators.required],
      title: [{ value: report.title, disabled: true}, Validators.required],
      description: [{ value: report.description, disabled: true}],
      location: [{ value: report.location, disabled: true}],
      long:  [{ value: report.long, disabled: true}],
      lat: [{ value: report.lat, disabled: true }],
      _reporter: [{ value: report._reporter['fname'] + ' ' + report._reporter['lname'], disabled: true }],
      _host: [{ value: report._host['name'], disabled: true }],
      status: [{ value: report.status, disabled: true }],
      people: [{ value: report.people.map(r => r.fname + ' ' + r.lname).join(', '), disabled: true }],
      properties: [{ value: report.properties.map(p => p.type).join(', '), disabled: true }],
      tags: [{ value: report.tags.join(', '), disabled: true }],
      createdAt: [{ value: report.createdAt, disabled: true }],
      updatedAt: [{ value: report.updatedAt, disabled: true }]
    });
  }

}
