import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBasicHighight]'
})
export class BasicHighightDirective implements OnInit{

  constructor(private elementRef:ElementRef) { }

  ngOnInit(){
    this.elementRef.nativeElement.style.backgroundColor='lightyellow';
  }

}
