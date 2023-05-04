import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sofort-source',
  templateUrl: './sofort-source.component.html',
  styleUrls: ['./sofort-source.component.css']
})
export class SofortSourceComponent {
@Input() sofort : any;
}
