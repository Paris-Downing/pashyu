import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    focus2;
    isLoggedIn = false;
    alert="";
    @Input()
    password = '';
    @Input()
    isStrong = false;

    constructor(public firebaseAuth : AngularFireAuth, private router: Router) { }

    ngOnInit() {
        if(localStorage.getItem('user') !== null) {
            this.isLoggedIn = true;
          }
    }

    //currently only works as long as one character has been typed for (input) and (keyup). (change) only works when you click enter
    //none work when the < sign is flipped
    public checkStrength(event: any) {
        console.log("CHECK STRENGTH CALLED", this.password)
        if(this.password.length > 5)
            this.isStrong = true;
        else   
            this.isStrong = false;
        //if it contains a number, a capital letter, and is more than 10 characters long, it is strong. Change isStrong= true; else, false;
    }

    public signup (email: string, password: string){
        try {
            this.firebaseAuth.createUserWithEmailAndPassword(email, password);
            this.isLoggedIn = true;
            this.router.navigate(['/tree'])
        }
        catch(errorCode){
            if(errorCode == "auth/email-already-in-use"){
                alert("Email already in use")
            }
        }
    }
}
