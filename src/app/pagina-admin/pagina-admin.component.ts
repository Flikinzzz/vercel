import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-admin',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatCardModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './pagina-admin.component.html',
  styleUrl: './pagina-admin.component.css'
})
export class PaginaAdminComponent {
  edicion: any;
  objetoEditar: any;
  objetos: any[];
  objeto: any;
  creacion = new FormGroup({
    nombre_producto: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl(0),
    tipo_producto: new FormControl(''),
    disponible: new FormControl(true),
  });
  edit = new FormGroup({
    nombre_producto: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl(0),
    tipo_producto: new FormControl(''),
    disponible: new FormControl(true),
  });

  constructor(private sus: SupabaseService) {
    this.objetos = [];
    this.objeto = {
      nombre_producto: "",
      descripcion: "",
      precio: 0,
      tipo_producto: 0,
      disponible: false
    }
    this.objetoEditar = {};
    this.edicion = false;
  }

  async ngOnInit() {
    this.getPlatos();
  }

  crearObjeto() {
    this.objeto.nombre_producto = this.creacion.value.nombre_producto;
    this.objeto.descripcion = this.creacion.value.descripcion;
    this.objeto.precio = this.creacion.value.precio;
    this.objeto.tipo_producto = this.creacion.value.tipo_producto;
    this.objeto.disponible = this.creacion.value.disponible;
    this.sus.crearProducto(this.objeto);
    Swal.fire('¡Objeto creado con éxito!', '', 'success');
  }


  async getPlatos() {
    const data = await this.sus.getTodo();
    this.objetos = data || [];
  }

  abrirEditar(data: any){
    this.edicion = true;
    this.objetoEditar = data;
    this.edit.patchValue({
      nombre_producto: this.objetoEditar.nombre_producto,
      descripcion: this.objetoEditar.descripcion,
      precio: this.objetoEditar.precio
    });
  }
  
  cerrarEditar(){
    this.edicion = false;
    this.objetoEditar = {};
  }

  eliminarCarritos(){
    this.sus.eliminarCarritos();
    Swal.fire('¡Carritos eliminados con éxito!', '', 'success');
  }

  async editar(data: any) {
    const estado = await this.sus.editarProducto(data);
    if (estado) {
      Swal.fire('¡Actualizado con éxito!', '', 'success');
    } else {
      Swal.fire("Hubo un error al actualizar", "", "error");
    }
  }
  async eliminar(data: any) {
    const estado = /*await this.sus.eliminarProducto(data);*/ false;
    if (estado) {
      Swal.fire('¡Eliminado con éxito!', '', 'error');
    } else {
      Swal.fire("Hubo un error al eliminar", "", "error");
    }
  }
  async toggle(data: any) {
    data.disponible = !data.disponible;
    const estado = await this.sus.editarProducto(data);
    if (estado) {
      Swal.fire('¡Actualizado con éxito!', '', 'success');
    } else {
      Swal.fire("Hubo un error al actualizar", "", "error");
    }
  }

  refrescar() {
    this.objetos = [];
    this.getPlatos();
  }

  outputDisponible(a: boolean){
    if(a){
      return "Disponible";
    }else{
      return"No disponible";
    }
  }

}
