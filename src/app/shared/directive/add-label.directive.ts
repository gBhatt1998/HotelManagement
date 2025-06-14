import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
    selector: '[appAddLabel]'
})
export class AddLabelDirective implements OnInit {
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        const parent = this.renderer.parentNode(this.el.nativeElement);

        // Ensure parent has a relative position
        this.renderer.setStyle(parent, 'position', 'relative');

        // Style the button for fixed top-right positioning inside the parent
        const button = this.el.nativeElement;
        this.renderer.setStyle(button, 'position', 'absolute');
        this.renderer.setStyle(button, 'top', '16px');
        this.renderer.setStyle(button, 'right', '16px');
        this.renderer.setStyle(button, 'z-index', '10');
        this.renderer.setStyle(button, 'padding', '6px 16px');
        this.renderer.setStyle(button, 'box-shadow', '0 2px 6px rgba(0,0,0,0.2)');
        this.renderer.setStyle(button, 'border-radius', '8px');
        this.renderer.setStyle(button, 'font-weight', '600');
        this.renderer.setStyle(button, 'transition', 'all 0.2s ease-in-out');

       
    }
}
