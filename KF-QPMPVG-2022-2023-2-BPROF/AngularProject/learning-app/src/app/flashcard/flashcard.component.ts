import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningSet } from '../_models/learning-set';
import { Card } from '../_models/card';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent {
  http: HttpClient
  route: ActivatedRoute
  set: LearningSet
  setUrl: string = 'http://localhost:5127/LearningSet'
  cardUrl: string = 'http://localhost:5127/Card'

  currentCard: Card
  index: number
  noPrevCard: boolean
  noNextCard: boolean

  finished:boolean

  flipped: boolean

  constructor(http: HttpClient, route: ActivatedRoute) {
    this.http = http
    this.route = route
    this.set = new LearningSet()
    this.currentCard = new Card()
    this.index = 0
    this.noNextCard = false
    this.noPrevCard = true

    this.finished = false

    this.flipped = false
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      let setId = param['id']
      this.http
      .get<Array<LearningSet>>(this.setUrl)
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
        
        this.currentCard = this.set.cards[this.index]

        this.setUpButtons()
      })
    })
    
  }

  flip(){
    if (!this.finished){
      this.flipped = !this.flipped
    }
  }

  prevCard(){
    if(this.index-1 >= 0){
      this.index -= 1
      this.currentCard = this.set.cards[this.index]
    }
    this.setUpButtons()
  }

  nextCard(){
    //this.alertClosed()
    if(this.index+1 < this.set.cards.length){
      this.index += 1
      this.currentCard = this.set.cards[this.index]
    }
    else{
      this.finished = true
    }
    this.setUpButtons()
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

  finish(): void{
    this.finished = true
  }
}
