import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';  // Importa el servicio
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
@Component({
  selector: 'app-idioma',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './idioma.component.html',
  styleUrl: './idioma.component.css'
})
export class IdiomaComponent {
  constructor(private translationService: TranslationService) { }

  // Función que cambia el idioma usando el TranslationService
  cambiarIdioma(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;
    this.translationService.changeLanguage(selectedLanguage);
  }
  
}
