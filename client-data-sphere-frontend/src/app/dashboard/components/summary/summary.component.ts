import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  // Sample data - you can update these as you integrate with the backend.
  totalAssets: number = 100;
  totalStocks: number = 60;
  totalOtherHoldings: number = 40;
}
