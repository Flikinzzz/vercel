import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-admin',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './pagina-admin.component.html',
  styleUrl: './pagina-admin.component.css'
})
export class PaginaAdminComponent {
  objetos: any[];
  constructor(private sus: SupabaseService) {
    this.objetos = [];
  }

  async ngOnInit(){
    this.getPlatos();
  }

  async getPlatos() {
    const data = await this.sus.getTodo();
    this.objetos = data || [];
  }

  async editar(data: any){
    const estado = await this.sus.editarProducto(data);
    if (estado){
      Swal.fire('¡Actualizado con éxito!', '', 'success');
    }else{
      Swal.fire("Hubo un error al actualizar", "", "error");
    }
  }
  async eliminar(data: any){
    const estado = await this.sus.editarProducto(data);
    if (estado){
      Swal.fire('¡Eliminado con éxito!', '', 'error');
    }else{
      Swal.fire("Hubo un error al eliminar", "", "error");
    }
  }
  async toggle(){

  }
}
