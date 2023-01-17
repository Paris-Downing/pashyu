import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

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

  constructor(public firebaseAuth : AngularFireAuth) { }

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
        }
        catch(errorCode){
            // if(errorCode == "auth/email-already-in-use"){
            //     alert("Email already in use")
            // }
        }
    }
}
