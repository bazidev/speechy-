import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { SlidPage } from'../slid/slid';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;


  index :number=0;
  isenabled:boolean=false;

  items:any[];

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
  }
    
  matches: String[];
  isRecording = false;
 
  constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition, private plt: Platform, private cd: ChangeDetectorRef) {
    this.items = [
      {
        word: 'penguin',
        image: 'assets/imgs/adult/easy/penguin.png',
      },
      {
        word: 'chicken',
        image: 'assets/imgs/adult/easy/chicken.jpg',
         },
      {
        word: 'penguin',
        image: 'assets/imgs/adult/easy/mouse.png',
      }
    ];
  }
 

  
  next() {
    //disable next button
    this.isenabled=false;
    this.index++;
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  /*prev() {
    this.slides.lockSwipes(false);

    this.slides.slidePrev();
    this.slides.lockSwipes(true);

  }*/


  // word validation
  wordValidation(){
      if(this.matches.indexOf(this.items[this.index].word) >-1 )
      {
        this.matches.push("valid");
        this.isenabled = true;
      }

      this.matches.push("not valid");
  }

  


  // voice functions
  isIos() {
    return this.plt.is('ios');
  }
 
  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }
 
  startListening() {
    this.getPermission();
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
       this.wordValidation();
    });
    this.isRecording = true;

  }
 
}