import { IReporter } from './../../interface';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { TableClass } from '../../classes';

@Component({
  selector: 'app-reporters-table',
  templateUrl: './reporters-table.component.html',
  styleUrls: ['./reporters-table.component.scss']
})
export class ReportersTableComponent extends TableClass implements OnInit {

  @Input() reporters: IReporter[]

  constructor() {
    super();
  }

  ngOnInit() {
    this.pages = this.getPages(Math.ceil(Number(this.count) / Number(this.limit)));
  }

}
