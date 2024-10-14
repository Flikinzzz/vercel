import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};  // Aquí almacenamos las traducciones cargadas
  private languageChange = new BehaviorSubject<string>('es');  // Inicialización correcta del BehaviorSubject
  private currentLanguage: string = 'es';  // Propiedad para almacenar el idioma actual

  constructor(private http: HttpClient) { }

  // Método para cargar las traducciones para un idioma
  loadTranslations(language: string) {
   /* this.currentLanguage = language;  // Actualizar el idioma actual
    
    // Cargar el archivo de traducción usando HttpClient
    const url = `assets/i18n/${language}.json`;
    this.http.get(url).subscribe(
      (translations: any) => {
        this.translations = translations;  // Guardar las traducciones cargadas
      },
      (error) => {
        console.error(`Error al cargar el archivo de traducción para ${language}:`, error);
      }
    );*/
  }

  // Método para cambiar el idioma
  changeLanguage(lang: string) {
    this.loadTranslations(lang);  // Cargar las traducciones del nuevo idioma
    this.languageChange.next(lang);  // Notificar a los suscriptores del cambio de idioma
  }

  // Método para obtener la traducción de una clave
  getTranslation(key: string): string {
    return this.translations[key] || key;  // Si no hay traducción, retorna la clave
  }

  // Método para subscribirse a cambios de idioma
  onLanguageChange() {
    return this.languageChange.asObservable();  // Exponer el observable para que los componentes se suscriban
  }
}
