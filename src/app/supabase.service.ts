import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
const supabaseURL = 'https://utzigyzeijlgmmgojnrw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0emlneXplaWpsZ21tZ29qbnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyODIwOTQsImV4cCI6MjA0MTg1ODA5NH0.PZJb53h5yJ5VFzG7FJar1qCDZBYYD5jH2odMeFngsJo';
const supabase = createClient(supabaseURL, supabaseKey);

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  nCarrito = Math.floor(Math.random() * 10001);
  constructor() {

  }

  /*async insertOrder(orderData: any) {
    const { data, error } = await supabase
      .from('pedido')
      .insert(orderData);

    if (error) {
      throw new Error('Error inserting order: ' + error.message);
    }

    return data;
  }*/

  async getPlatos(ids: number[]) {
    const { data, error } = await supabase
      .from('producto')
      .select('*')
      .in('tipo_producto', ids);

    if (error) {
      console.error('Error fetching data:', error);
      return [];
    }
    return data || []; // nose porque va el "|| []" pero con eso no me da error, no quitar!!
  }

  async getTodo(){
    const { data, error } = await supabase
      .from('producto')
      .select('*');
    if (error) {
      console.error('Error fetching data:', error);
      return [];
    }
    return data || []; // nose porque va el "|| []" pero con eso no me da error, no quitar!!
  }
  

  async getInfoPlatos(id: number){
    const { data, error } = await supabase
      .from('producto')
      .select('*')
      .eq('tipo_producto', id);
    if (error) {
      console.error('Error fetching data:', error);
      return 'xd';
    }
    console.log(id);
    console.log(data);
    return data[0]; // nose porque va el "|| []" pero con eso no me da error, no quitar!!
  }


  


  getNCarrito(): String {
    return this.nCarrito.toString();
  }

  async addCarrito(datos: any) {
    const { error } = await supabase
      .from('carrito')
      .insert([
        { numero_carrito: this.nCarrito, id_producto: datos.id_producto, cantidad : 1 },
      ])
  }

  async editarProducto(data: any) {
    const { error } = await supabase
      .from('producto')
      .update(data)
      .eq('id_producto', data.product_id);
      if (error){
        console.error('Error fetching data:', error);
        return false;
      }
      return true;
  }
  async eliminarProducto(data: any) {
    const { error } = await supabase
      .from('producto')
      .delete(data)
      .eq('id_producto', data.product_id);
      if (error){
        console.error('Error fetching data:', error);
        return false;
      }
      return true;
  }
  async eliminarCarrito(data:any){
    const { error } = await supabase
      .from('carrito')
      .delete(data)
      .eq('id_producto', data.product_id)
      .eq('numero_carrito', this.nCarrito);
      if (error){
        console.error('Error fetching data:', error);
        return false;
      }
      return true;
  }

  async getCarrito() {
    const { data, error } = await supabase
      .from('carrito')
      .select('*')
      .eq('numero_carrito', this.nCarrito);
    if (error) {
      console.error('Error fetching data:', error);
      return [];
    }
      return data; // nose porque va el "|| []" pero con eso no me da error, no quitar!!
  }

  /* async insertOrderDetail(orderDetailData: any) {
     const { data, error } = await supabase
       .from('pedido_detalle')
       .insert(orderDetailData);
 
     if (error) {
       throw new Error('Error inserting order detail: ' + error.message);
     }
 
     return data;
   }*/
}