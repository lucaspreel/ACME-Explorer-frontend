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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    TranslatableComponent,
    TripListComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps : [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  exports: [AppRoutingModule],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
