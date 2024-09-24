import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningSet } from '../_models/learning-set';
import { Card } from '../_models/card';
import { AppUser } from '../_models/appuser';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

/*
Todos:
- Finish Set -> rework logic; instantly end set ✔
- Finished page: accuracy% after 'x of y' ✖
- Remove unused methods ✖
*/


  http: HttpClient
  route: ActivatedRoute
  set: LearningSet
  url: string = 'http://localhost:5127/LearningSet'
  userUrl: string = 'http://localhost:5127/AppUser'
  userid: string = ''

  currentCard: Card
  index: number
  answer: string

  show: boolean
  alertColor: string
  alertMessage: string

  noPrevCard: boolean
  noNextCard: boolean
  checking: boolean

  correctAnswers: number

  cardPercent: number
  progressPercent: number 

  finished:boolean
  incorrect: boolean

  constructor(http: HttpClient, route: ActivatedRoute) {
    this.http = http
    this.route = route
    this.set = new LearningSet()
    this.currentCard = new Card()
    this.index = 0
    this.answer = ''
    this.show = false
    this.alertColor = ''
    this.alertMessage = ''
    this.noNextCard = false
    this.noPrevCard = true
    this.checking = false
    this.correctAnswers = 0
    this.cardPercent = 0
    this.progressPercent = 0
    this.finished = false
    this.incorrect = false
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      let setId = param['id']
      this.http
      .get<Array<LearningSet>>(this.url)
      .subscribe(resp => {
        resp.filter(x => x.id === setId)
        .map(x => {
          this.set.id = x.id
          this.set.name = x.name
          this.set.description = x.description
          this.set.isPrivate = x.isPrivate
          this.set.ownerId = x.ownerId
          x.cards.map(y=> {
            let c = new Card()
            c.question = y.question
            c.answer = y.answer
            c.image = y.image
            c.id = y.id
            c.learningSetId = c.learningSetId
            this.set.cards.push(c)
          })
        })
        console.log(this.set)

        this.cardPercent = 100 / this.set.cards.length
        this.progressPercent += this.cardPercent
        
        this.currentCard = this.set.cards[this.index]

        this.setUpButtons()
      })
    })
  }

  check(answer: string) {
    this.checking = true
    
    if(answer.toLowerCase() == this.currentCard.answer.toLowerCase()){
      this.correctAnswers += 1
      this.showAlert('✅ Correct answer', 'success')
      if(this.isLastQuestion()){
        this.finish()
      }
    }
    else{
      this.showAlert('❌ Incorrect answer', 'danger')
      this.incorrect = true
    }
  }

  isLastQuestion():boolean{
    if(this.index == this.set.cards.length-1){
      return true
    }
    else return false
  }

  tryAgain():void{
    this.closeAlert()
    this.checking = false
    this.incorrect = false
  }

  next():void{
    this.closeAlert()
    this.checking = false
    this.nextCard()
  }

  prevCard(){
    this.closeAlert()
    if(this.index-1 >= 0){
      this.decreaseProgress()
      this.index -= 1
      this.currentCard = this.set.cards[this.index]
    }
    this.setUpButtons()
  }

  nextCard(){
    //this.alertClosed()
    if(this.index+1 < this.set.cards.length){
      this.increaseProgress()
      this.index += 1
      this.currentCard = this.set.cards[this.index]
    }
    else{
      this.finished = true
    }
    this.setUpButtons()
  }

  decreaseProgress(): void{
    this.progressPercent -= this.cardPercent
    if(this.progressPercent < 0){
      this.progressPercent = 0
    }
  }

  increaseProgress(): void{
    this.progressPercent += this.cardPercent
    if(this.progressPercent > 100){
      this.progressPercent = 100
    }
  }

  setUpButtons(){
    if(this.index > 0){
      this.noPrevCard = false
    }
    else{
      this.noPrevCard = true
    }
    if(this.index+1 == this.set.cards.length){
      this.noNextCard = true
    }
    else{
      this.noNextCard = false
    }
  }

  public showAlert(msg: string, colorInput: string) : void {
    this.alertColor = 'alert-' + colorInput // alert-danger
    this.alertMessage = msg
    this.show = true
  }

  public closeAlert() : void {
    this.show = false
    this.answer = ''
  }

  finish(): void{
    this.progressPercent = 100
    setTimeout(() => 
    {
      this.finished = true
    },
    500);

    let tempUserId = localStorage.getItem('userid')
    if (tempUserId != null){
      this.userid = tempUserId
    }
    else{
      this.userid = 'Userid'
    }
    
    let user = new AppUser()

    this.http
    .get<AppUser>(this.userUrl + '/' + this.userid)
    .subscribe(resp =>{
      let tempUser = new AppUser()
      tempUser.id = resp.id
      tempUser.userName = resp.userName
      tempUser.image = resp.image
      tempUser.email = resp.email
      tempUser.timesCompleted = resp.timesCompleted
      tempUser.timesPlayed = resp.timesPlayed

      resp.ownedSets.map(x=>{
        let s = new LearningSet()
          s.id = x.id
          s.name = x.name
          s.description = x.description
          s.isPrivate = x.isPrivate
          s.ownerId = x.ownerId
          
        x.cards.map(y=>{
          let c = new Card()
          c.id = y.id
          c.question = y.question
          c.answer = y.answer
          c.image = y.image
          c.learningSetId = y.learningSetId

          s.cards.push(c)
        })
        tempUser.ownedSets.push(s)
      })

      user = tempUser
      if(this.correctAnswers == this.set.cards.length){
        user.timesCompleted += 1
      }
      else if(this.correctAnswers < this.set.cards.length){
        user.timesPlayed += 1
      }
  
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      this.http
      .put(
        this.userUrl,
        user,
        { headers: headers }
      )
      .subscribe(
        (success) => {
          console.log(user);
          
          this.showAlert('Create was successful!', 'success')
        },
        (error) => {
          this.showAlert('Error occured, please try again.', 'danger')
        }
      )
      //console.log(user);
      
    })

    
  }

}
