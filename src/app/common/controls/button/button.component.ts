import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      (click)="onClick()"
      [ngClass]="buttonClasses"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary';
  @Output() buttonClick = new EventEmitter<void>();

  get buttonClasses(): string {
    const baseClasses = 'p-2 rounded hover:bg-opacity-80 transition-colors';
    const colorClasses = {
      primary: 'bg-amber-300 hover:bg-amber-400',
      secondary: 'bg-gray-300 hover:bg-gray-400',
      danger: 'bg-red-500 hover:bg-red-600 text-white',
    };

    return `${baseClasses} ${colorClasses[this.color]} ${
      this.disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`;
  }

  onClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
