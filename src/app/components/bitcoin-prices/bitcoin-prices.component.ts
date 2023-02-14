import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-bitcoin-prices',
  templateUrl: './bitcoin-prices.component.html',
  styleUrls: ['./bitcoin-prices.component.css']
})
export class BitcoinPricesComponent implements OnInit {
  searchHeight: any;
  gridHeight: any;
  minDate: Date;
  maxDate: Date;
  fromDate: any;
  toDate: any;
  originalData: any;
  loading: boolean = false;
  displayedColumns: string[] = ['date', 'high', 'low', 'open', 'close', 'volume_btc', 'volume_usd'];
  dataSource: any;
  constructor(private client: HttpClient, public datepipe: DatePipe) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    this.minDate = new Date(currentYear - 20, 0, 0);
    this.maxDate = new Date(currentYear, currentMonth, currentDay);
    this.searchForm.controls['dateFrom'].setValue(new Date('2018-01-01'));
    this.searchForm.controls['dateTo'].setValue(new Date());
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<any>(false, []);
  searchForm: FormGroup = new FormGroup({
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
  });
  ngOnInit(): void {
    this.searchHeight = window.innerHeight - 110 + 'px';
    this.gridHeight = window.innerHeight - 170 + 'px';
    this.getDataFromCanvasJS();
  }
  getDataFromCanvasJS() {
    debugger
    this.loading = true;
    this.client.get("https://canvasjs.com/data/docs/btcusd2018.json").subscribe((data: any) => {
      this.originalData = data;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.loading = false;
      }, 1000);

    })
  }
  onSearchClick() {
    debugger
      this.loading = true; 
      this.dataSource.data=this.originalData;
      this.fromDate = this.datepipe.transform(this.searchForm.controls['dateFrom'].value, 'yyyy-MM-dd');
      this.toDate = this.datepipe.transform(this.searchForm.controls['dateTo'].value, 'yyyy-MM-dd');
      this.dataSource.data = this.dataSource.data.filter((e: any) => e.date >= this.fromDate && e.date <= this.toDate);
      setTimeout(() => {
        this.loading = false;
      }, 1000);

    }
  
}
