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
import { ApplicationDisplayComponent } from './components/application/application-display/application-display.component';
import { ApplicationEditComponent } from './components/application/application-edit/application-edit.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { ApplicationCreateComponent } from './components/application/application-create/application-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProfileDisplayComponent } from './components/profile/profile-display/profile-display.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/trips', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'register', component: RegisterComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'anonymous'}},
  {path: 'profile', children: [
    {path: 'display/:id', component: ProfileDisplayComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'MANAGER|ADMINISTRATOR|EXPLORER|SPONSOR'}},
    {path: 'edit/:id', component: ProfileEditComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'MANAGER|ADMINISTRATOR|EXPLORER|SPONSOR'}}
  ]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [ActorRoleGuard], data: { expectedRole: RolesEnum.anonymous } },
  {
    path: 'trips', children: [
      {
        path: ':id/sponsorship', component: SponsorshipCreateComponent,
        canActivate: [ActorRoleGuard], data: { expectedRole: 'SPONSOR|ADMINISTRATOR' }
      },
      { path: 'display/:id', component: TripDisplayComponent },
      { path: 'create', component: TripCreateComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER|ADMINISTRATOR' } },
      { path: '', component: TripListComponent },
      { path: ':managerId', component: TripListComponent },
      { path: 'update/:id', component: TripUpdateComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'MANAGER|ADMINISTRATOR' } }
    ]
  },
  {
    path: 'applications', children: [
      {
        path: ':id', children: [
          { path: '', component: ApplicationDisplayComponent },
          { path: 'edit', component: ApplicationEditComponent }
        ]
      },
      { path: '', component: ApplicationListComponent },
      { path: 'create/:tripId', component: ApplicationCreateComponent }
    ],
  },
  {
    path: 'users', children: [
      { path: '', component: UserListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'ADMINISTRATOR'} },
      { path: 'create', component: UserCreateComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'ADMINISTRATOR'} }
    ],
  },
  {path: 'sponsorships', children: [
    {path: 'create', component: SponsorshipCreateComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}},
    {path: ':id', children: [
      {path: '', component: SponsorshipDisplayComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}},
      {path: 'edit', component: SponsorshipUpdateComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}}
    ]},
    {path: ':sponsorId', component: SponsorshipListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR'}},
    {path: '', component: SponsorshipListComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'SPONSOR|ADMINISTRATOR'}}
  ]},
  {
    path: 'checkout', children: [
      {
        path: ':id', children: [
          { path: '', component: CheckoutComponent, canActivate: [ActorRoleGuard], data: { expectedRole: RolesEnum.signedIn } },
        ]
      },
    ],
  },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'not-found', component: NotFoundPageComponent },
  { path: 'denied-access', component: DeniedAccesPageComponent },
  { path: '**', redirectTo: '/not-found' }
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
