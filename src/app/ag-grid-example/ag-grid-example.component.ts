import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Module } from 'ag-grid-community';
@Component({
  selector: 'app-ag-grid-example',
  templateUrl: './ag-grid-example.component.html',
  styleUrls: ['./ag-grid-example.component.scss']
})
export class AgGridExampleComponent {
  public gridApi: any;
  public gridColumnApi: any;

  public modules: Module[] = [
  ];
  public columnDefs: any;
  public defaultColDef: any;
  public autoGroupColumnDef: any;
  public sideBar: any;
  public rowData: any = [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: 'country',
        rowGroup: true,
        enableRowGroup: true,
      },
      {
        field: 'year',
        rowGroup: true,
        enableRowGroup: true,
        enablePivot: true,
      },
      { field: 'date' },
      { field: 'sport' },
      {
        field: 'gold',
        aggFunc: 'sum',
      },
      {
        field: 'silver',
        aggFunc: 'sum',
      },
      {
        field: 'bronze',
        aggFunc: 'sum',
      },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
    };
    this.autoGroupColumnDef = { minWidth: 250 };
    this.sideBar = 'columns';
  }

  onBtNormal() {
    this.gridColumnApi.setPivotMode(false);
    this.gridColumnApi.applyColumnState({
      state: [
        {
          colId: 'country',
          rowGroup: true,
        },
        {
          colId: 'year',
          rowGroup: true,
        },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }

  onBtPivotMode() {
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.applyColumnState({
      state: [
        {
          colId: 'country',
          rowGroup: true,
        },
        {
          colId: 'year',
          rowGroup: true,
        },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }

  onBtFullPivot() {
    this.gridColumnApi.setPivotMode(true);
    this.gridColumnApi.applyColumnState({
      state: [
        {
          colId: 'country',
          rowGroup: true,
        },
        {
          colId: 'year',
          pivot: true,
        },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
        console.log("Row Data here", this.rowData)
      });
  }
  dataStates: any = [];
  saveState() {
    this.dataStates.push(this.gridColumnApi.getColumnState());
    console.log("Columns state",this.dataStates);
    console.log('column state saved', this.gridColumnApi.getColumnState());
  }

  restoreState() {
    if (this.gridColumnApi.getColumnState()) {
      console.log('no columns state to restore by, you must save state first');
      return;
    }
    this.gridColumnApi.applyColumnState({
      state: this.gridColumnApi.getColumnState(),
      applyOrder: true,
    });
    console.log('column state restored');
  }

  resetState() {
    this.gridColumnApi.resetColumnState();
    console.log('column state reset');
  }
  newData: any = [];
  getCurrentData() {
    this.gridApi.getRenderedNodes()
    console.log("New data here", this.gridApi.getModel().rowsToDisplay);
  }
  selectState(val: any) {
    console.log("Columns state",this.dataStates);
    this.gridColumnApi.applyColumnState({ state:  this.dataStates[val.target.value],  applyOrder: true });
    console.log("select state", val.target.value)
  }
}
