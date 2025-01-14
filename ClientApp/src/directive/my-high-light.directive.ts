import { Directive, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[my-high-light]'
})
export class MyHighLightDirective {
  @Input()
  highlightColor!: string;

  @HostBinding("class")
  myClass!: string;

  constructor(private el: ElementRef) {
    console.log(el);
    el.nativeElement.style.backgroundColor = '#ff3300';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    //这里在操作DOM
    //这种操作代码非常丑陋
    this.el.nativeElement.style.backgroundColor = color;
  }
}
