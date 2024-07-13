import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 500); // Un pequeño retraso asegura que el DOM esté listo
  }
}