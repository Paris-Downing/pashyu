import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  textbox1?: string = '';
  textboxLocked: boolean = false;
  showAlert: boolean = false;
  alertType: string = "alert-success";  //success, warning, danger
  alertMessage: string = "That's correct!";
  incorrectQuestions: number[] = [];
  answerText: string = '';
  currentLesson: number;

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

  constructor(private route: ActivatedRoute) {}


  public async read() {
    var chapterNumber = ((this.currentLesson - (this.currentLesson % 6)) / 6) + 1;
    // console.log("CURRENT CHAPTER", chapterNumber)
    // var chapterVar = "chapter ".toString();
    // var chapterString = chapterVar.concat(chapterNumber.toString());
    const querySnapshot = await getDocs(collection(this.db, "chapter " + chapterNumber.toString()));

    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().question}`);
      // this.questions = [
      //   ...this.questions.slice(0, doc.data().questionNumber),
      //   doc,
      //   ...this.questions.slice(doc.data().questionNumber)
      // ]
      if(doc.data().lesson.toString() === this.currentLesson.toString()) {
        this.questions.push(doc.data());
      }
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

  verifyAnswer(): void {
    this.textboxLocked = true;
    let amountOfMistakes = this.checkAnswer();
    this.showAlert = true;  //set to false when continue button is pressed
    if (amountOfMistakes >= 1) {
      this.alertType = "alert-danger";
      this.alertMessage = "Incorrect!";
      this.incorrectQuestions.unshift(this.questionNumber);
    } else if (amountOfMistakes > 0) {
      this.alertType = "alert-warning";
      this.alertMessage = "(Mostly) Correct!"
    } else {
      this.alertType = "alert-success";
      this.alertMessage = "Correct!"
    }
  }

  public findQuestion(questionNumber: number): DocumentData{
    for (let i = 0; i < this.questions.length; i++) {
      if(this.questions[i].questionNumber == this.questionNumber){
        return this.questions[i];
      }
    }
  }

  //edits a sentence to get rid of punctuation and spacing errors
  checkAnswer(): number {
    //1) Removes punctuation
    this.answerText = this.findQuestion(this.questionNumber).answer;  
    let modifiedSentence1 = this.answerText.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
    let modifiedSentence2 = this.textbox1?.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");

    //2) Removes capitalization
    modifiedSentence1 = modifiedSentence1?.toLowerCase();
    modifiedSentence2 = modifiedSentence2?.toLowerCase();

    if((modifiedSentence1 === undefined) || (modifiedSentence2 === undefined))
      return 100;

    //3) Removes extra spacing
    const sentence1 = modifiedSentence1.replace(/  +/g, ' ');
    const sentence2 = modifiedSentence2.replace(/  +/g, ' ');

    //4) Accepts 1 missing letter, 1 extra letter, 1 mistake for every 2-3 words
    return this.checkSentence(sentence1, sentence2, this.allowedMistakes(modifiedSentence1)); 
  }

  allowedMistakes(modifiedSentence1: string): number {
    var spaceCount = modifiedSentence1.split(" ").length - 1;
    return Math.floor(spaceCount / 2);
  }

  //checks how many serious errors are in the sentence 
  checkSentence(sentence1: string, sentence2: string, mistakesAllowed: number): number {
    if(sentence1.length === sentence2.length)
    {
      if(sentence1 === sentence2) { 
        // console.log("ERROR TYPE 1"); //both sentences are the same
        return 0; 
      } else {
        for(let i = 0; i < sentence1.length; i++) { 
          if(sentence1.charAt(i) != sentence2.charAt(i)) { 
              mistakesAllowed--; 
              if(mistakesAllowed < 0) { 
                // console.log("ERROR TYPE 2");  //a word had at least 2 wrong letters
                  return 1; 
              } 
          }
        }
        // console.log("ERROR TYPE 3"); //a letter was typed wrong/without an accent
        return .5;
      }
    } else if ((sentence1.length + 1 === sentence2.length) || (sentence2.length + 1 === sentence1.length)) {
        for(let i = 0, j = 0; i < sentence1.length || j < sentence2.length; i++, j++) { 
          if(sentence1.charAt(i) != sentence2.charAt(i)) { 
              mistakesAllowed--; 
              if(mistakesAllowed < 0) { 
                  // console.log("ERROR TYPE 4");  //there were too many extra or missing letters
                  return 1; 
              }
              if(sentence1.length + 1 === sentence2.length) {
                j++;
              } else { 
                i++; 
              }
          }
        }
      // console.log("ERROR TYPE 5");
      return .5;  //there was only one missing or extra letter
    } else {
      // console.log("ERROR TYPE 6");  //the words didn't match at all
      return 1;
    }
  }

  //clears the message after Correct/Incorrect was shown
  nextQuestion(): void {
    this.textbox1 = '';
    this.textboxLocked = false;
    this.showAlert = false;
    this.questionNumber += 1;
    this.answerText = '';
    // this.checkAnswer();
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentLesson = params['id'];
    });
    console.log("FIRST ONE", this.currentLesson)
    this.read();
    console.log(this.questions) 

    await this.questions.sort((a,b) => a.questionNumber - b.questionNumber )
    console.log(this.questions)
  }
}
