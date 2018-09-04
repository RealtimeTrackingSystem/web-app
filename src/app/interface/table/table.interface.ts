export interface ITable {
  prevPage(): void;
  nextPage(): void;
  firstPage(): void;
  lastPage(): void;
  goToPage(pageNumber: number): void;
}
