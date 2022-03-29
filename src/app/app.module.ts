import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth'
import { HeaderComponent } from './components/master/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const firebaseConfig = {
  apiKey: "AIzaSyCDfw_5qjfLJgdEsjz-AB2-NrZ5UhXz7BQ",
  authDomain: "acme-explorer-frontend-71af9.firebaseapp.com",
  projectId: "acme-explorer-frontend-71af9",
  storageBucket: "acme-explorer-frontend-71af9.appspot.com",
  messagingSenderId: "612655358968"
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
