import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlatosPrincipalesComponent } from './platos-principales/platos-principales.component';
import { BebestiblesComponent } from './bebestibles/bebestibles.component';
import { VeganoComponent } from './vegano/vegano.component';
import { IdiomaComponent } from './idioma/idioma.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'platosPrincipales', component: PlatosPrincipalesComponent },
    { path: 'bebestibles', component: BebestiblesComponent },
    { path: 'vegano', component: VeganoComponent },
    { path: 'idioma', component: IdiomaComponent }
];
