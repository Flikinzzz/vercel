import { Component, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatDividerModule} from '@angular/material/divider'
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { TranslationService } from './translation.service';
import {MatButtonModule} from '@angular/material/button'



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSidenavModule, MatOptionModule, MatIconModule, MatToolbarModule, MatDividerModule, MatListModule, RouterLink, MatButtonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCollapsed = true;
  isMobile= true;
  selectedLanguage = 'es'; // Idioma por defecto
  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }}

    constructor(
      private observer: BreakpointObserver,
      private translationService: TranslationService  // Inyectar el servicio de traducción
    ) {}
  
  ngOnInit() {
    // Cargar las traducciones para el idioma por defecto (español)
    this.translationService.loadTranslations(this.selectedLanguage);

    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

    });
}
  // Método para cambiar el idioma
  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translationService.changeLanguage(lang);
  }
  // Método para obtener las traducciones de las claves
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }



}