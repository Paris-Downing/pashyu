import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


@Component({
  selector: 'app-lesson1',
  templateUrl: './lesson1.component.html',
  styleUrls: ['./lesson1.component.css']
})
export class Lesson1Component {
  firebaseConfig = {
    apiKey: "AIzaSyAonyugX8VwhZmnQbVADw-wgxg4XCHJgzE",
    authDomain: "pashto-app-5fa83.firebaseapp.com",
    projectId: "pashto-app-5fa83",
    storageBucket: "pashto-app-5fa83.appspot.com",
    messagingSenderId: "324837154833",
    appId: "1:324837154833:web:b03efac57f2205b55a51b0",
    measurementId: "G-31HXY9GKS3"
  };

  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);


  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(this.app);



  public async read() {
    const querySnapshot = await getDocs(collection(this.db, "chapter 1"));

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().question}`);
    });
  }

  /* questionType:  
    1- translation (first time learning word)
    2- Pashto to English
    3- English to Pashto
  */
  public async write() {
    try {
      const docRef = await addDoc(collection(this.db, "chapter 1"), {
        answer: "am",
        lesson: 1,
        question: "yam",
        questionNumber: 2,
        questionType: 1
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  ngOnInit() {
    this.read();
  }


}
