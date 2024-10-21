import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { SupabaseService } from '../supabase.service';
import { TranslationService } from '../translation.service'; // Importa el servicio de traducción
import { Subscription } from 'rxjs'; // Importa 'Subscription' para suscribir a cambios de idioma

@Component({
  selector: 'app-platos-principales',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './platos-principales.component.html',
  styleUrl: './platos-principales.component.css'
})
export class PlatosPrincipalesComponent implements OnInit {
  platosPrincipales: any[];
  mainCoursesTitle: string = '';  // Título para 'Platos principales'
  priceLabel: string = '';        // Texto para 'Precio'
  moreInfoLabel: string = '';     // Texto para 'Más información'
  addToCartLabel: string = '';    // Texto para 'Añadir al carrito'
  languageSubscription!: Subscription; // Suscripción para detectar cambios de idioma


  constructor(private sus: SupabaseService, private translationService: TranslationService) {
    this.platosPrincipales = [];
    this.getPlatos([1, 2, 3]);
  }

  ngOnInit() {
    this.loadTranslations(); // Cargar las traducciones al iniciar el componente
    
    // Suscribirse a los cambios de idioma y recargar las traducciones cuando se cambie el idioma
    this.languageSubscription = this.translationService.onLanguageChange().subscribe(() => {
      this.loadTranslations();
    });
  }

  async getPlatos(ids: number[]) {
    const data = await this.sus.getPlatos(ids);
    this.platosPrincipales = data || [];
  }

  mostrarInfo(plato: any) {
    Swal.fire({
      title: `${plato.nombre_producto}`,
      html: `${plato.descripcion}<br>${this.priceLabel}: $${plato.precio}`, // Traducción aplicada al texto de precio
      confirmButtonText: this.addToCartLabel, // Traducción aplicada al botón de añadir al carrito
      confirmButtonColor: '#71cf13',
      cancelButtonText: 'Cancelar', // Si también quieres traducir esto, puedes añadir una clave en el archivo JSON
      cancelButtonColor: '#DBDBDB',
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡Producto agregado!", "", "success");
        this.sus.addCarrito(plato);
      }
    });
  }

  anadirAlCarrito(plato: any){
    this.sus.addCarrito(plato);
    Swal.fire("¡Producto agregado!", "", "success");
  }

  // Método para cargar las traducciones según el idioma actual
  loadTranslations() {
    this.mainCoursesTitle = this.translationService.getTranslation('mainCourses');
    this.priceLabel = this.translationService.getTranslation('price');
    this.moreInfoLabel = this.translationService.getTranslation('moreInfo');
    this.addToCartLabel = this.translationService.getTranslation('addToCart');
  }

  ngOnDestroy() {
    // Cancelar la suscripción cuando el componente se destruya
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
