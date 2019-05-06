import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';


@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  
  constructor(private renderer:Renderer2, private elRef:ElementRef) { }
  @Input() defaultColor: string = "transparent";
  @Input() highlightColor: string = "lightblue";
  @HostBinding('style.backgroundColor') backgroundColor:string='transparent';

  ngOnInit(){
    this.renderer.setStyle(this.elRef.nativeElement, 'color','darkblue');
    this.renderer.setStyle(this.elRef.nativeElement, 'text-align','center');
    this.backgroundColor=this.defaultColor;
  }
  @HostListener('mouseenter') mouseover(eventData:Event){
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color','lightblue');
    this.backgroundColor=this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData:Event){
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color','transparent');
    this.backgroundColor=this.defaultColor;
  }

}
