import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  constructor() {}

  setTheme(theme: 'dark' | 'light') {
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}
