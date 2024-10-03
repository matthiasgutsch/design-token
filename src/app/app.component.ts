import { Component, inject } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'design-token';
  #theme: ThemeService = inject(ThemeService);


  switchTheme(): void {
    this.#theme.toggleTheme();
  }

  isDarkThemeActive(): boolean {
    return this.#theme.isDarkThemeActive();
  }

  getThemeToggleLabel(): string {
    return this.#theme.getToggleLabel();
  }
}
