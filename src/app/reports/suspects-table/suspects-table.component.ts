import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableClass } from '../../classes';
@Component({
  selector: 'app-suspects-table',
  templateUrl: './suspects-table.component.html',
  styleUrls: ['./suspects-table.component.scss']
})
export class SuspectsTableComponent extends TableClass implements OnInit, OnChanges {

  @Input() suspects: any[];
  @Input() fields: string[] = ['_id', 'fname', 'lname', 'reportedAt', 'reportTitle', 'reportStatus', 'type', 'actions'];
  @Input() actions: string[] = ['viewDetails', 'sendClearance'];
  @Input() pagination = true;
  @Input() searchBar = true;
  @Output() clickInfo = new EventEmitter<any>();
  @Output() searchSuspects = new EventEmitter<any>();
  @Output() sendSummon = new EventEmitter<any>();
  @Output() viewSummonDetails = new EventEmitter<any>();
  @Output() sendClearance = new EventEmitter<any>();

  public fiteredSuspects: any[];
  public suspectSearchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.fiteredSuspects = this.suspects;
    this.suspectSearchForm = this.formBuilder.group({
      searchString: []
    });
  }

  ngOnChanges (changes) {
    this.pages = this.getPages(Math.ceil(Number(this.count) / Number(this.limit)));
    this.fiteredSuspects = this.suspects;
  }

  onClickInfo (event) {
    this.clickInfo.emit(event);
  }

  onSearchSuspects () {
    this.searchSuspects.emit(this.suspectSearchForm.value.searchString);
  }

  toShow (field) {
    return this.fields.indexOf(field) > -1;
  }

  toShowActions (action) {
    return this.actions.indexOf(action) > -1;
  }

  onSendSummonClick (event) {
    this.sendSummon.emit(event);
  }

  onViewSummonDetailsClick (event) {
    this.viewSummonDetails.emit(event);
  }

  onSendClearanceClick (event) {
    this.sendClearance.emit(event);
  }

}
