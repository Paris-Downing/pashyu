import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { TreeComponent } from './tree/tree.component';
import { FirebaseService } from './shared/firebase.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { Lesson1Component } from './lesson1/lesson1.component';
import { Chapter1Component } from './chapter1/chapter1.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    TreeComponent,
    Lesson1Component,
    Chapter1Component,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAonyugX8VwhZmnQbVADw-wgxg4XCHJgzE",
      authDomain: "pashto-app-5fa83.firebaseapp.com",
      projectId: "pashto-app-5fa83",
      storageBucket: "pashto-app-5fa83.appspot.com",
      messagingSenderId: "324837154833",
      appId: "1:324837154833:web:9efa510b698495555a51b0",
      measurementId: "G-T622DWJBK5"
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
