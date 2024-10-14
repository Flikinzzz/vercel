import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
import { empresa } from '../info-empresa/empresa';

@Component({
  selector: 'app-g-objetivo',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './g-objetivo.component.html',
  styleUrl: './g-objetivo.component.scss'
})
export class GObjetivoComponent {

  grupos: any[];
  gObjetivos: any[];
  empresalist: any[];
  empresas: any[];

  constructor() {
    this.empresalist = [];
    this.getPeople();
    this.getGrupos();
    this.empresas = [this.empresalist];
    this.grupos = [];
    this.gObjetivos = [this.grupos];
  }

  async getPeople(){
    const result = await fetch('http://localhost:8000/api/core/get/list/classname/');
    const response = (await result.json()) as any[];
    this.empresalist = response;
    console.log(this.empresalist);
  }

  conseguirNombre(eid: any){
    let resultado: any;
    resultado = {
      nombre: "no encontrado"
    }
    for(let i = 0; i < this.empresas.length+1; i++){
      console.log(this.empresalist[i].eid);
      if(this.empresalist[i].eid == eid){
        resultado = this.empresalist[i];
      }
    }
    return resultado.nombre;
  }

  async getGrupos(){
    const result = await fetch('http://localhost:8000/api/core/get/list/gobjetivo/');
    const response = (await result.json()) as any[];
    this.grupos = response;
  }

  async getEmpresa(eid: any){
    let importada: any;
    const result = await fetch(
      `http://localhost:8000/api/core/get/classname/${eid}/`);
    const c = await result.json();
    importada = await c;
    return importada.nombre
  }
  async addGrupo() {
    type AddEmpresaForm = {
      eid: string;
      nombre: string;
      correo: string;
      edad: number;
      oid: string;
      genero: string;
    };

    let oidInput: HTMLInputElement;
    let eidInput: HTMLInputElement;
    let nombreInput: HTMLInputElement;
    let correoInput: HTMLInputElement;
    let edadInput: HTMLInputElement;
    let generoInput: HTMLInputElement;

    Swal.fire<AddEmpresaForm>({
      title: "Agregar empresa",
      html: `
    <input type="text" id="oid" class="swal2-input" placeholder="ID grupo objetivo">
    <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
    <input type="text" id="correo" class="swal2-input" placeholder="Correo electrónico">
    <input type="text" id="genero" class="swal2-input" placeholder="Genero">
    <input type="text" id="edad" class="swal2-input" placeholder="edad">
    <input type="text" id="eid" class="swal2-input" placeholder="ID empresa">
    `,
      confirmButtonText: "Sign in",
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!;
        eidInput = popup.querySelector("#eid") as HTMLInputElement;
        oidInput = popup.querySelector("#oid") as HTMLInputElement;
        nombreInput = popup.querySelector("#nombre") as HTMLInputElement;
        correoInput = popup.querySelector("#correo") as HTMLInputElement;
        edadInput = popup.querySelector("#edad") as HTMLInputElement;
        generoInput = popup.querySelector("#genero") as HTMLInputElement;
        eidInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        oidInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        nombreInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        correoInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        edadInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        generoInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
      },
      preConfirm: () => {
        const eid = eidInput.value;
        const oid = oidInput.value;
        const nombre = nombreInput.value;
        const correo = correoInput.value;
        const edad = edadInput.value;
        const genero = generoInput.value;
        if (!nombre || !oid || !correo || !edad)  {
          Swal.showValidationMessage(`Por favor rellene los campos`);
        }
        return { oid,eid, nombre,correo,edad, genero };
      },
    });
}

  deleteGrupo(objetivo: any) {
    Swal.fire({
      title: "¡Precaución!",
      text: `¿Está seguro que desea eliminar a ${objetivo.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      confirmButtonColor: "crimson",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        const response = await fetch(
          `http://localhost:8000/api/core/delete/gobjetivo/${objetivo.oid}/`,
          {
            method: "DELETE",
          }
        );

        if (response.status >= 200 && response.status <= 205) {
          Swal.fire({
            title: "Eliminado",
            text: `${objetivo.nombre} se ha eliminado de los registros`,
            icon: "success",
          }).then((ok) => {
            if (ok.value) {
              this.getPeople();
            }
          });
        } else {
          Swal.fire({
            title: "Error",
            text: `No se pudo eliminar a ${objetivo.nombre}`,
            icon: "error",
          });
        }
       Swal.fire({
        title: "¡Borrado con éxito!",
        icon: "success"
       })
      }
    });
  }
}
