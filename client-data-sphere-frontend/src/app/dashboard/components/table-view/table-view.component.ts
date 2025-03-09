import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    AgGridModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule
  ],
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent {
  // Selected view: "Stocks" or "Holdings"
  public selectedView: string = 'Stocks';

  // ag-Grid configuration with sample columns and row data.
  public columnDefs: ColDef[] = [
    { headerName: 'Make', field: 'make', sortable: true, filter: true },
    { headerName: 'Model', field: 'model', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true }
  ];

  public rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];

  // For the search bar
  public searchQuery: string = '';

  // Register the Client Side Row Model module for ag-Grid
  public modules = [ClientSideRowModelModule];

  onSearch(): void {
    console.log('Search for:', this.searchQuery);
  }

  onViewChange(): void {
    console.log('Switched view to:', this.selectedView);
  }
}
