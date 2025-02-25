import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercaseText]',
})
export class UppercaseTextDirective {
  constructor( private el: ElementRef, private control: NgControl) { }

  @HostListener('input') onInput() {
    const value = this.el.nativeElement.value.toUpperCase();
    this.control.control?.setValue(value, { emitEvent: false });
    this.el.nativeElement.value = value;
  }


}
