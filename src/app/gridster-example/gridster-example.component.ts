import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Module } from 'ag-grid-community';

import { CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType, PushDirections, Resizable } from 'angular-gridster2';
import { DataService } from '../Shared/Services/data.service';

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

@Component({
  selector: 'app-gridster-example',
  templateUrl: './gridster-example.component.html',
  styleUrls: ['./gridster-example.component.scss']
})
export class GridsterExampleComponent implements OnInit {
  public options: Safe;
  public dashboard: Array<GridsterItem>;

  public gridApi: any;
  public gridColumnApi: any;

  public modules: Module[] = [
  ];
  public columnDefs: any;
  public defaultColDef: any;
  public autoGroupColumnDef: any;
  public sideBar: any;
  public rowData: any = [];

  constructor(private http: HttpClient,
    private dataService: DataService) {
    this.options = {
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      pushDirections: { north: true, east: true, south: true, west: true },
    }
    this.dashboard = [];

    this.columnDefs = [
      {
        field: 'country',
        rowGroup: true,
        enableRowGroup: true,
        filter: true, filterParams: { applyButton: true, newRowsAction: 'keep' }
      },
      {
        field: 'year',
        rowGroup: true,
        enableRowGroup: true,
        enablePivot: true,
        filter: true
      },
      {
        field: 'date',
        filter: true
      },
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
      flex: 8,
      minWidth: 150,
      sortable: true,
      resizable: true,
    };
    this.autoGroupColumnDef = { minWidth: 250 };
    this.sideBar = 'columns';
  }
  dashValues: any;
  agClass: string = 'ag-theme-alpine'
  ngOnInit(): void {
    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.None,
      margin: 5,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 767,
      rowHeightRatio: 0.3,
      minCols: 1,
      maxCols: 12,
      minRows: 100,
      maxRows: 1000,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 160,
      fixedRowHeight: 10,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: false,
        stop: (event, $element, widget) => {
          console.log("dragable");
          this.saveInDatabase($element, event, 'position');
        }
      },
      resizable: {
        enabled: false,
      },
      itemChangeCallback: () => { this.saveGrid() },
      itemResizeCallback: this.itemResize.bind(this),
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.OnDragAndResize,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };
    // if (localStorage.getItem('Dash')) {
    //   this.dashValues=localStorage.getItem('Dash');
    //   this.dashboard=JSON.parse(this.dashValues);
    //   console.log("Dashh Values",JSON.parse((this.dashValues)));
    // } else {
    this.dashboard = [
      { id: 1, cols: 12, rows: 3, y: 0, x: 0 },
      { id: 2, cols: 6, rows: 12, y: 2, x: 12, hasContent: true, dragEnabled: true },
      { id: 2, cols: 6, rows: 12, y: 2, x: 12, hasContent: true, dragEnabled: true },
      { id: 2, cols: 6, rows: 12, y: 3, x: 12, hasContent: true, dragEnabled: true },
      { id: 2, cols: 6, rows: 12, y: 3, x: 12, hasContent: true, dragEnabled: true },
      // { id: 3, cols: 2, rows: 1, y: 0, x: 1 }
    ];
    //  }

    this.dataService.checkToggleDarkMode.subscribe(
      (Response) => {
        if (Response) {
          this.isDarkMode = true;
          this.agClass = 'ag-theme-alpine-dark';
        }else{
          this.agClass = 'ag-theme-alpine';
        }
      },
      (Error) => {

      }
    )
  }
  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }
  setHeight: any = '';
  setWidth: any = '';
  public itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
    if (itemComponent.item.id == 2) {
      setTimeout(() => {
        this.setHeight = itemComponent.height;
        // console.log("Current Height", this.setHeight)
        // console.log("itemC omponent", itemComponent); // take a closer look at the gridster property;
      }, 100)

      this.setWidth = '100%';
    }

  }

  removeItem($event: MouseEvent | TouchEvent, item: any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }
  saveInDatabase(widgetId: any, value: any, field: string): void {
    //  console.log("widgetId",widgetId);
    //  console.log("value",value);
    //  console.log("field",field);
  }
  private saveGrid = (): void => {
    localStorage.setItem("Dash", JSON.stringify(this.dashboard));

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
        // console.log("Row Data here", this.rowData)
      });
  }
  dataStates: any = [];
  saveState() {
    this.dataStates.push(this.gridColumnApi.getColumnState());
    console.log("Columns state", this.dataStates);
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
    console.log("Columns state", this.dataStates);
    this.gridColumnApi.applyColumnState({ state: this.dataStates[val.target.value], applyOrder: true });
    console.log("select state", val.target.value)
  }
  filterChanged() {
    var savedFilterModel = this.gridApi.getFilterModel();
    console.log("Saved filters,", savedFilterModel);
  }
  toggle(toggleFlag: boolean) {
    if (toggleFlag) {
      this.options.draggable.enabled = true;
      this.options.resizable.enabled = true;
    } else {
      this.options.draggable.enabled = false;
      this.options.resizable.enabled = false;
    }
    this.changedOptions();
  }
  isDarkMode: boolean = false;
  toggleMode(checkFlag: boolean) {
    if (checkFlag) {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = false;
    }
    this.changedOptions();
  }
}
