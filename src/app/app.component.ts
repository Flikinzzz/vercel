import { Component, HostListener, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDividerModule } from '@angular/material/divider'
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { TranslationService } from './translation.service';
import { MatButtonModule } from '@angular/material/button'
import Swal from 'sweetalert2';
import { SupabaseService } from './supabase.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSidenavModule, MatOptionModule, MatIconModule, MatToolbarModule, MatDividerModule, MatListModule, RouterLink, MatButtonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  carrito: any[];
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCollapsed = true;
  isMobile = true;
  selectedLanguage = 'es'; // Idioma por defecto
  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  constructor(
    private observer: BreakpointObserver,
    private translationService: TranslationService,  // Inyectar el servicio de traducción
    private sus: SupabaseService,
    private router: Router
  ) {
    this.carrito = [];
  }

  ngOnInit() {
    // Cargar las traducciones para el idioma por defecto (español)
    this.translationService.loadTranslations(this.selectedLanguage);

    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

    });
  }

  @HostListener("window:beforeunload", ["$event"]) beforeUnloadHandler(event: Event) {
    this.sus.unAdmin();
    this.sus.limpiarCarrito();
    console.log("Finalizado proceso.")
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

  async getCarrito() {
    const data = await this.sus.getCarrito();
    this.carrito = data;
  }


  async mostrarInfo() {
    let descripcion = '';
    const data = await this.sus.getCarrito();
    this.carrito = data;
    var ids: number[];
    let subtotal: number = 0;
    ids = [];
    for (var i = 0; i < this.carrito.length; i++) {
      ids.push(this.carrito[i].id_producto);
    }
    var plato = await this.sus.getPlatos(ids);
    for (var i = 0; i < this.carrito.length; i++) {
      descripcion = descripcion + plato[i].nombre_producto + '        $' + plato[i].precio + '<br>';
      subtotal = subtotal + plato[i].precio;
    }
    let nCarrito = this.sus.getNCarrito();
    descripcion = descripcion + '<br>Su numero de orden es: ' + nCarrito + '<br>SubTotal: $' + subtotal;
    Swal.fire({
      title: `Carrito`,
      html: descripcion,
      confirmButtonText: 'Ver y modificar carrito',
      confirmButtonColor: '#71cf13',
      cancelButtonText: 'Cerrar',
      cancelButtonColor: '#DBDBDB',
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/', 'carrito']);
      }
    });
  }


}