
import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

export class TableClass {
  @Input() count: number;
  @Input() page: number;
  @Input() limit: number;
  @Output() nextPage = new EventEmitter<any>();
  @Output() prevPage = new EventEmitter<any>();
  @Output() firstPage = new EventEmitter<any>();
  @Output() lastPage = new EventEmitter<any>();
  @Output() goToPage = new EventEmitter<any>();
  @Output() details = new EventEmitter<any>();

  constructor () {}

  getPages (pageTotal): number[] {
    let number: number[] = [];
    for (let x = 0; x < pageTotal; x++) {
      number = number.concat([x]);
    }
    return number;
  }

  onNextPage () {
    this.nextPage.emit();
  }

  onPrevPage () {
    this.prevPage.emit();
  }

  onFirstPage () {
    this.firstPage.emit();
  }

  onLastPage () {
    this.lastPage.emit();
  }

  onTargetPage (pageNumber) {
    this.goToPage.emit(pageNumber);
  }

  onClickDetails (data: any) {
    this.details.emit(data);
  }
}
