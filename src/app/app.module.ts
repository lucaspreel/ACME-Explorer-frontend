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
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCDfw_5qjfLJgdEsjz-AB2-NrZ5UhXz7BQ",
  authDomain: "acme-explorer-frontend-71af9.firebaseapp.com",
  projectId: "acme-explorer-frontend-71af9",
  storageBucket: "acme-explorer-frontend-71af9.appspot.com",
  messagingSenderId: "612655358968"
};

export function HttpLoaderFactory (http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    TranslatableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps : [HttpClient]
      }
    })
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
