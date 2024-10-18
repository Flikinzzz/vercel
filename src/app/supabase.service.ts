import { Injectable } from '@angular/core';
import { createClient} from '@supabase/supabase-js';
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
        .in('id_producto', ids);
    
      if (error) {
        console.error('Error fetching data:', error);
        return []; 
      }
    
      return data || []; // nose porque va el "|| []" pero con eso no me da error, no quitar!!
    }
    
    async getNCarrito(){
      return this.nCarrito;
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