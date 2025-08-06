import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastOptions {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'; // ✅ Add these two!
  duration?: number;
}


@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastOptions | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(options: ToastOptions) {
    this.toastSubject.next(options);

    setTimeout(() => {
      this.toastSubject.next(null);
    }, options.duration || 4000); // default 4s
  }

  clear() {
    this.toastSubject.next(null);
  }
}
