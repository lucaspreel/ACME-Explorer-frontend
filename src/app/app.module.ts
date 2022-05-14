import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth'
import { HeaderComponent } from './components/master/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/security/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/security/register/register.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { DeniedAccesPageComponent } from './components/shared/denied-acces-page/denied-acces-page.component';
import { MessageComponent } from './components/master/message/message.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { LocalizedDatePipe } from './components/shared/localized-date.pipe';
import { LocalizedDecimalPipe } from './components/shared/localized-decimal.pipe';
import { registerLocaleData } from '@angular/common';
import locales from '@angular/common/locales/es';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { HttpModule } from '@angular/http';
import { SponsorshipListComponent } from './components/sponsorship/sponsorship-list/sponsorship-list.component';
import { SponsorshipDisplayComponent } from './components/sponsorship/sponsorship-display/sponsorship-display.component';
import { SponsorshipCreateComponent } from './components/sponsorship/sponsorship-create/sponsorship-create.component';
import { SponsorshipUpdateComponent } from './components/sponsorship/sponsorship-update/sponsorship-update.component';
import { TripCreateComponent } from './components/trip/trip-create/trip-create.component';
import { TripUpdateComponent } from './components/trip/trip-update/trip-update.component';
import { DataTablesModule } from 'angular-datatables';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { ApplicationEditComponent } from './components/application/application-edit/application-edit.component';
import { ApplicationDisplayComponent } from './components/application/application-display/application-display.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { ApplicationCreateComponent } from './components/application/application-create/application-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

const firebaseConfig = {
  apiKey: "AIzaSyCDfw_5qjfLJgdEsjz-AB2-NrZ5UhXz7BQ",
  authDomain: "acme-explorer-frontend-71af9.firebaseapp.com",
  projectId: "acme-explorer-frontend-71af9",
  storageBucket: "acme-explorer-frontend-71af9.appspot.com",
  messagingSenderId: "612655358968"
};


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

registerLocaleData(locales, 'es');
registerLocaleData(locales, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    TranslatableComponent,
    TripListComponent,
    NotFoundPageComponent,
    DeniedAccesPageComponent,
    MessageComponent,
    TripDisplayComponent,
    FooterComponent,
    LocalizedDatePipe,
    LocalizedDecimalPipe,
    TermsAndConditionsComponent,
    SponsorshipListComponent,
    SponsorshipDisplayComponent,
    SponsorshipCreateComponent,
    SponsorshipUpdateComponent,
    TripCreateComponent,
    TripUpdateComponent,
    SponsorshipCreateComponent,
    DashboardComponent,
    ApplicationListComponent,
    ApplicationEditComponent,
    ApplicationDisplayComponent,
    ProfileEditComponent,
    ApplicationCreateComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps : [HttpClient]
      }
    }),
    AppRoutingModule,
    HttpModule
  ],
  exports: [AppRoutingModule],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
