import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBodyComponent } from './components/forms/form-body/form-body.component';
import { FormHeaderComponent } from './components/forms/form-header/form-header.component';
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
  FormBodyComponent,
  FormHeaderComponent,
  LandingComponent,
  RegistrationComponent,
];
