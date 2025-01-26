import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { HeaderComponent } from "./header/header.component";
import { NgxTranslateModule } from './translate/translate.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgxTranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-list';
  readonly environment = environment;
  siteLanguage = 'English';
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'Marathi' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private translate: TranslateService) {
  }

  ngAfterViewInit() {
    this.toggleMode();
  }

  toggleMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Perform DOM manipulation only if running in the browser
      if (environment?.isDark) {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
      }
    }
  }

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find((language) => language.code === localeCode)
      ?.label.toString();
    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage;
      this.translate.use(localeCode);
    }
    const currentLanguage = this.translate.currentLang;
    console.log('currentLanguage', currentLanguage);
  }
  
}
