import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { ActorRoleGuard } from './guards/actor-role.guard';
import { DeniedAccesPageComponent } from './components/shared/denied-acces-page/denied-acces-page.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { SponsorshipListComponent } from './components/sponsorship/sponsorship-list/sponsorship-list.component';
import { SponsorshipDisplayComponent } from './components/sponsorship/sponsorship-display/sponsorship-display.component';
import { SponsorshipCreateComponent } from './components/sponsorship/sponsorship-create/sponsorship-create.component';
import { SponsorshipUpdateComponent } from './components/sponsorship/sponsorship-update/sponsorship-update.component';
import { TripCreateComponent } from './components/trip/trip-create/trip-create.component';
import { TripUpdateComponent } from './components/trip/trip-update/trip-update.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import RolesEnum from './utils/roles_enum';

const appRoutes: Routes = [
  {path: '', redirectTo: '/trips', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'register', component: RegisterComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'dashboard', component: DashboardComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'trips', children: [
    {path: 'display/:id', component: TripDisplayComponent},
    {path: 'create', component: TripCreateComponent},
    {path: '', component: TripListComponent},
    {path: ':managerId', component: TripListComponent},
    {path: 'update/:id', component: TripUpdateComponent}
  ]},
  {path: 'applications', component: ApplicationListComponent, canActivate: [ActorRoleGuard],data: {expectedRole: RolesEnum.signedIn}},
  {path: 'sponsorships', children: [
    {path: 'create', component: SponsorshipCreateComponent},
    {path: ':id', children: [
      {path: '', component: SponsorshipDisplayComponent},
      {path: 'edit', component: SponsorshipUpdateComponent}
    ]},
    {path: '', component: SponsorshipListComponent}
  ]},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: 'not-found', component: NotFoundPageComponent},
  {path: 'denied-access', component: DeniedAccesPageComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
