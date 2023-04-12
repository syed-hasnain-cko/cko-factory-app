import { Component, OnInit, Output, Renderer2 ,EventEmitter, ChangeDetectorRef, Input} from '@angular/core';
 
import { frameStyle} from './frame-style';
 
declare var Frames : any;
 
@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  disablePayButton : boolean = true;
  frameActivated: boolean = false;
 
  @Input() outerFormValid : boolean = false;
  @Output() tokenized : EventEmitter<any> = new EventEmitter();
 
  constructor(private renderer: Renderer2,private cd: ChangeDetectorRef) { }
 
  ngOnInit(): void {
 
    const script = this.renderer.createElement('script');
    script.src = ""
    this.renderer.appendChild(document.head, script);
    Frames.init(
      {
        publicKey:"pk_sbox_7za2ppcb4pw7zzdkfzutahfjl4t",
        style: frameStyle,
        schemeChoice: true
  });
    Frames.addEventHandler(
      Frames.Events.CARD_VALIDATION_CHANGED,
       (event:any) => {
        console.log("CARD_VALIDATION_CHANGED: %o", event);
        this.togglePayButton(!Frames.isCardValid());
       this.cd.detectChanges();
      }
    );
 
 
 
 
    Frames.addEventHandler(
      Frames.Events.CARD_TOKENIZED,
      (event:any) => {
 
        this.tokenized.emit(event.token);
        
      }
    );
  }
  togglePayButton(cardValid: boolean) {
    
    this.disablePayButton = cardValid;
    console.log(this.disablePayButton);
  }
 
 
  submit(event:any){
    event.preventDefault();
    Frames.submitCard();
  }
 
  isFrameActive(){
    return this.frameActivated;
  }
 
  isPayButtonActive(){
    return this.disablePayButton;
  }
 
 
 
}
 

