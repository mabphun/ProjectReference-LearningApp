import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LearningSet } from '../_models/learning-set';
import { Card } from '../_models/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-set',
  templateUrl: './edit-set.component.html',
  styleUrls: ['./edit-set.component.scss']
})
export class EditSetComponent implements OnInit {
  http: HttpClient
  route: ActivatedRoute
  set: LearningSet

  url:string = 'http://localhost:5127/LearningSet'

  //Alerts
  show: boolean
  alertColor: string
  alertMessage: string

  constructor(http: HttpClient, route: ActivatedRoute){
    this.http = http
    this.route = route
    this.set = new LearningSet()
    this.show = false
    this.alertColor = ''
    this.alertMessage = ''
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
      })
    })
  }

  public editSet() : void {    
    if(this.valid()){
      this.set.cards.forEach(x=> {
        if(x.id.length < 5){
          x.id = ''
        }
      })

      console.log(this.set);
      
      
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      this.http
      .put(
        this.url,
        this.set,
        { headers: headers }
      )
      .subscribe(
        (success) => {
          this.showAlert('Edit was successful!', 'success')
        },
        (error) => {
          this.showAlert('Error occured, please try again.', 'danger')
        }
      )
      
    }
    else{
      this.showAlert('Please fill the required fields and have at least 1 card!', 'danger')
    }
    
  }

  deleteCard(card: Card){  
    //let index = this.cards.findIndex(x=> x.answer == card.answer && x.question == card.question && x.image == card.image)
    let index = this.set.cards.findIndex(x=> x.id == card.id)
    this.set.cards.splice(index, 1)
  }

  addCard(){
    let c = new Card()
    c.id = this.set.cards.length.toString()
    this.set.cards.push(c)
  }

  valid() : boolean{
    if (this.set.name.length >= 5 && this.set.cards.length > 0){
      return true
    }
    else return false
  }

  //Alerts

  public showAlert(msg: string, colorInput: string) : void {
    this.alertColor = 'alert-' + colorInput // alert-danger
    this.alertMessage = msg
    this.show = true
  }

  public alertClosed() : void {
    this.show = false
  }

  checkCards() : boolean{
    let index = -1
    index = this.set.cards.findIndex(t=> t.answer == '' || t.question == '')
    if (index == -1){
      return true
    }
    else return false
  }
}
