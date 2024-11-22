import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
getTranslation(arg0: string) {
throw new Error('Method not implemented.');
}
  validado: boolean;
  wrong = false;
  datosLogin = new FormGroup({
    nombre_usuario: new FormControl(''),
    contraseña: new FormControl('')
  });
  infoLogin: any;

  constructor(private sus: SupabaseService, private router: Router){
    this.validado = false;
    this.checkeoAdmin();
  }

  async checkeoAdmin() {
    let resultado = await this.sus.checkAdmin();
    this.validado = resultado;
  }

  async validacion(){
    let datos = this.datosLogin.value;
    let resultado = await this.sus.checkAuth(datos.nombre_usuario, datos.contraseña);
    if(resultado){
      this.sus.hacerAdmin();
      this.router.navigate(['/']);
      Swal.fire('Login successful!', '', 'success'); 
    }else{
      this.wrong = true;
    }
  }
}
