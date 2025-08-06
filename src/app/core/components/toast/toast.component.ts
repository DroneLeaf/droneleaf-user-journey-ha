import { Component } from '@angular/core';
import { ToastOptions, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toast: ToastOptions | null = null;

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe((data) => {
      this.toast = data;
    });
  }

  close() {
    this.toast = null;
  }

get positionClasses(): string {
  switch (this.toast?.position) {
    case 'top-left':
      return 'top-5 left-5';
    case 'top-center':
      return 'top-5 left-1/2 transform -translate-x-1/2';
    case 'top-right':
      return 'top-5 right-5';
    case 'bottom-left':
      return 'bottom-5 left-5';
    case 'bottom-right':
      return 'bottom-5 right-5';
    case 'bottom-center':
      return 'bottom-5 left-1/2 transform -translate-x-1/2';
    default:
      return 'top-5 right-5'; // fallback
  }
}


  get icon(): string {
    if (!this.toast) return '';
    switch (this.toast.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
      default:
        return 'ℹ️';
    }
  }
}
