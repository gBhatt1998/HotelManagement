import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-chip-popover',
  templateUrl: './chip-popover.component.html',
  styleUrls: ['./chip-popover.component.css']
})
export class ChipPopoverComponent implements OnDestroy {
  @Input() services: string[] = [];
  @Input() buttonLabel: string = '';
  @ViewChild('triggerBtn', { static: false }) triggerButton!: any;

  @ViewChild('popoverTemplate') popoverTemplate!: TemplateRef<any>;
  overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay, private vcr: ViewContainerRef) {}

  openPopover(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }

    if (this.overlayRef) {
      this.closePopover();
      return;
    }

    const target = event?.currentTarget as HTMLElement || this.triggerButton?.nativeElement;

    if (!target) return;

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(target)
      .withFlexibleDimensions(false)
      .withPush(false)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    const portal = new TemplatePortal(this.popoverTemplate, this.vcr);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.closePopover());
  }
  

  closePopover(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  ngOnDestroy(): void {
    this.closePopover();
  }
}
