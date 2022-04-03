import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth'
import { HeaderComponent } from './components/master/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/security/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemDisplayComponent } from './components/item/item-display/item-display.component';
import { RegisterComponent } from './components/security/register/register.component';

const firebaseConfig = {
  apiKey: "AIzaSyDEyDXvLfEu1B59iAHLvgvWluRYpZRBi3I",
  authDomain: "acme-explorer-ad626.firebaseapp.com",
  projectId: "acme-explorer-ad626",
  storageBucket: "acme-explorer-ad626.appspot.com",
  messagingSenderId: "458761220785",
  appId: "1:458761220785:web:964c4613315178cce7a890"
};



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ItemDisplayComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
