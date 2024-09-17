import { Routes } from '@angular/router';
import { provideRouter, RouterModule } from '@angular/router';
import { PropertyListComponent } from './components/property-list/property-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: PropertyListComponent },
];

// Add this in your main app component where routing is needed
export const AppRouting = RouterModule.forRoot(routes);
