import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Agrega esta línea
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};
  private languageChange = new BehaviorSubject<string>('es');
  private currentLanguage: string = 'es';

  constructor(private http: HttpClient) { }

  loadTranslations(language: string) {
    this.currentLanguage = language;
    const url = `assets/i18n/${language}.json`;
    this.http.get(url).subscribe(
      (translations: any) => {
        this.translations = translations;
      },
      (error) => {
        console.error(`Error al cargar el archivo de traducción para ${language}:`, error);
      }
    );
  }

  changeLanguage(lang: string) {
    this.loadTranslations(lang);
    this.languageChange.next(lang);
  }

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }

  onLanguageChange() {
    return this.languageChange.asObservable();
  }

  // Nuevo método para obtener el idioma actual
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
}
