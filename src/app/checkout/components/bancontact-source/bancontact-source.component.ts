import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bancontact-source',
  templateUrl: './bancontact-source.component.html',
  styleUrls: ['./bancontact-source.component.css']
})
export class BancontactSourceComponent {
  @Input() bancontact : any;
}
