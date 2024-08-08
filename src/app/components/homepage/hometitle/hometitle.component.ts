import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hometitle',
  templateUrl: './hometitle.component.html',
  styleUrls: ['./hometitle.component.css']
})
export class HometitleComponent implements OnInit {
  @ViewChild('parent') parent!: ElementRef;
  @ViewChild('topPanel') topPanel!: ElementRef;
  @ViewChild('handle') handle!: ElementRef;

  private skewHack = 0;
  private delta = 0;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    // Ensure DOM is ready
    this.renderer.listen('window', 'mousemove', (event: MouseEvent) => {
      if (this.parent && this.topPanel && this.handle) {
        const parentElement = this.parent.nativeElement as HTMLElement;
        const topPanelElement = this.topPanel.nativeElement as HTMLElement;
        const handleElement = this.handle.nativeElement as HTMLElement;

        // If the parent has .skewed class, set the skewHack var.
        if (parentElement.classList.contains('skewed')) {
          this.skewHack = 1000;
        }

        // Get the delta between the mouse position and center point.
        this.delta = (event.clientX - window.innerWidth / 2) * 0.5;

        // Move the handle.
        this.renderer.setStyle(handleElement, 'left', `${event.clientX + this.delta}px`);

        // Adjust the top panel width.
        this.renderer.setStyle(topPanelElement, 'width', `${event.clientX + this.skewHack + this.delta}px`);
      }
    });
  }
}
