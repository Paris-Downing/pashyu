import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { DocumentData, QuerySnapshot, addDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


@Component({
  selector: 'app-lesson1',
  templateUrl: './lesson1.component.html',
  styleUrls: ['./lesson1.component.css']
})
// interface Question {
//   answer: string;
//   lesson: number;
//   question: string;
//   questionNumber: number
//   questionType: number
//  }
export class Lesson1Component {
  questions : DocumentData[] = [];
  questionNumber = 1;
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
      // console.log(`${doc.id} => ${doc.data().question}`);
      // this.questions = [
      //   ...this.questions.slice(0, doc.data().questionNumber),
      //   doc,
      //   ...this.questions.slice(doc.data().questionNumber)
      // ]
      this.questions.push(doc.data());
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
        answer: "Za Asad yam. Aya ta Leila ye?",
        lesson: 1,
        question: "I am Asad. Are you Leila?",
        questionNumber: 18,
        questionType: 3
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  public next(){
    this.questionNumber+=1;
    
  }

  public findQuestion(questionNumber: number): DocumentData{
    for (let i = 0; i < this.questions.length; i++) {
      if(this.questions[i].questionNumber == this.questionNumber){
        return this.questions[i];
      }
    }
  }

  async ngOnInit() {
    this.read();
    console.log(this.questions)

    await this.questions.sort((a,b) => a.questionNumber - b.questionNumber )
    console.log(this.questions)
  }
}
