import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { RegistrationComponent } from "./components/pages/registration/registration.component";

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  LandingComponent,
  RegistrationComponent,
];
