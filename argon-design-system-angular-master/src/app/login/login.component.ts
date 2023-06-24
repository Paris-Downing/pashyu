import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  isLoggedIn = false;

  //credentials: test@test.com test123
  //test@testid.com test@testid.com

  constructor(public firebaseAuth : AngularFireAuth, private router: Router) { }

    ngOnInit() {
      if(localStorage.getItem('user') !== null) {
        this.isLoggedIn = true;
      }
    }

    public logIn (email: string, password: string){
        try {
            this.firebaseAuth.signInWithEmailAndPassword(email, password);
            this.isLoggedIn = true;
            console.log("YOU ARE LOGGED IN")
            this.router.navigate(['/tree'])
        }
        catch(errorCode){
            // if(errorCode == "auth/email-already-in-use"){
            //     alert("Email already in use")
            // }
        }
    }
}
