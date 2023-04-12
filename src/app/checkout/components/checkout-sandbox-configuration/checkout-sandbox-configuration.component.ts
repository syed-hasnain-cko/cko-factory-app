import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout-sandbox-configuration',
  templateUrl: './checkout-sandbox-configuration.component.html',
  styleUrls: ['./checkout-sandbox-configuration.component.css']
})
export class CheckoutSandboxConfigurationComponent  {

  invalidControls = 'data: ';

   sandboxConfiguration : FormGroup = new FormGroup({
    publicKey: new FormControl(localStorage.getItem('publicKey') !== null ? localStorage.getItem('publicKey'):environment.publicKey,[Validators.required, Validators.minLength(5)]),
    secretKey: new FormControl(localStorage.getItem('secretKey') !== null ? localStorage.getItem('secretKey'):environment.secretKey,[Validators.required, Validators.minLength(5)]),
    processingChannelId: new FormControl(localStorage.getItem('processingChannelId') !== null ? localStorage.getItem('processingChannelId'):environment.processingChannelId,[Validators.required,Validators.minLength(5)]),
    currencyAccountId: new FormControl(localStorage.getItem('currencyAccountId') !== null ? localStorage.getItem('currencyAccountId'):environment.currencyAccountId,[Validators.required,Validators.minLength(5)]),
    saveConfiguration: new FormControl('Save Configuration')
  });

  saveConfiguration(){
    
    console.log(this.sandboxConfiguration.valid)
    if(localStorage.getItem('publicKey') !== null || localStorage.getItem('publicKey') !== this.sandboxConfiguration.controls['publicKey'].value)
    {
      localStorage.setItem('publicKey',this.sandboxConfiguration.controls['publicKey'].value !== null ? this.sandboxConfiguration.controls['publicKey'].value : environment.publicKey)
    }
    if(localStorage.getItem('secretKey') !== null || localStorage.getItem('secretKey') !== this.sandboxConfiguration.controls['secretKey'].value)
    {
      localStorage.setItem('secretKey',this.sandboxConfiguration.controls['secretKey'].value !== null ? this.sandboxConfiguration.controls['secretKey'].value : environment.secretKey)
    }
    if(localStorage.getItem('processingChannelId') !== null || localStorage.getItem('processingChannelId') !== this.sandboxConfiguration.controls['processingChannelId'].value)
    {
      localStorage.setItem('processingChannelId',this.sandboxConfiguration.controls['processingChannelId'].value !== null ? this.sandboxConfiguration.controls['processingChannelId'].value : environment.processingChannelId)
    }
    if(localStorage.getItem('currencyAccountId') !== null || localStorage.getItem('currencyAccountId') !== this.sandboxConfiguration.controls['currencyAccountId'].value)
    {
      localStorage.setItem('currencyAccountId',this.sandboxConfiguration.controls['currencyAccountId'].value !== null ? this.sandboxConfiguration.controls['currencyAccountId'].value : environment.currencyAccountId)
    }
  }
   findInvalidControls() {

    this.invalidControls = 'data: ';

    let sk = this.sandboxConfiguration.controls['secretKey'];
    let pk = this.sandboxConfiguration.controls['publicKey'];
    let ca = this.sandboxConfiguration.controls['currencyAccountId'];
    let pc = this.sandboxConfiguration.controls['processingChannelId'];
    let save = this.sandboxConfiguration.controls['saveConfiguration'];

    if(!sk.value.includes('sk_sbox_')){
        this.invalidControls += ' secret key';
    }
    if(!pk.value.includes('pk_sbox_') ){
      this.invalidControls += ' public key';
  }
  if(!ca.value.includes('ca_')){
    this.invalidControls += ' currency account id';
}
if(!pc.value.includes('pc_')){
  this.invalidControls += ' processing channel id';
}
console.log(this.invalidControls)
if(this.invalidControls !== 'data: ')
{
  save.disable();
}
else
{
  save.enable()
}

}

}
