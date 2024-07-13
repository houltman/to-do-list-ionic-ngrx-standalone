import { Directive, ElementRef, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {
  @ViewChild('inputElement', { static: false }) inputElement!: IonInput;
  constructor(private el: ElementRef) { }



  ionViewDidEnter() {
    setTimeout(() => {
      this.inputElement.setFocus();
    }, 500);
  }


}