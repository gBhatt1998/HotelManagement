import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
    selector: '[appAddLabel]'
})
export class AddLabelDirective implements OnInit {
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        const parent = this.renderer.parentNode(this.el.nativeElement);
        this.renderer.setStyle(parent, 'position', 'relative');
        this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
        this.renderer.setStyle(this.el.nativeElement, 'top', '8px');
        this.renderer.setStyle(this.el.nativeElement, 'right', '8px');
        this.renderer.setStyle(this.el.nativeElement, 'z-index', '1000');
    }
}
