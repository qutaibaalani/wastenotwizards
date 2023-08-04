import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string;
  private tooltipElement: HTMLElement;
  private isVisible: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (!this.isVisible) {
      this.tooltipElement = this.renderer.createElement('div');
      this.tooltipElement.textContent = this.tooltipText;
      this.tooltipElement.className = 'tooltip';
      this.renderer.appendChild(this.elementRef.nativeElement, this.tooltipElement);
      this.isVisible = true;
    }
  }

  private hideTooltip() {
    if (this.isVisible) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.tooltipElement);
      this.isVisible = false;
    }
  }
}
