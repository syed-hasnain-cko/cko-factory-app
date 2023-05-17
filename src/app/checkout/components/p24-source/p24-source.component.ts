import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-p24-source',
  templateUrl: './p24-source.component.html',
  styleUrls: ['./p24-source.component.css']
})
export class P24SourceComponent {
  @Input() p24 : any;
}
