import { Component } from '@angular/core';
import { Card } from '../_models/card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LearningSet } from '../_models/learning-set';

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.scss']
})
export class CreateSetComponent {
  http: HttpClient
  set: LearningSet
  cards: Array<Card>

  url:string = 'http://localhost:5127/LearningSet'

  //Alerts
  show: boolean
  alertColor: string
  alertMessage: string

  constructor(http: HttpClient){
    this.http = http
    this.set = new LearningSet()
    this.cards = []
    let c = new Card()
    c.id = '0'
    this.cards.push(c)
    this.show = false
    this.alertColor = ''
    this.alertMessage = ''
  }


  public createSet() : void {
    this.set.cards = this.cards

    if(this.valid()){
      let ownerid = localStorage.getItem('userid')
      if(ownerid != null){
        this.set.ownerId = ownerid
      }
      this.cards.forEach(x=> x.id = '')

      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      this.http
      .post(
        this.url,
        this.set,
        { headers: headers }
      )
      .subscribe(
        (success) => {
          this.showAlert('Create was successful!', 'success')
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
    let index = this.cards.findIndex(x=> x.id == card.id)
    this.cards.splice(index, 1)
  }

  addCard(){
    let c = new Card()
    c.id = this.cards.length.toString()
    this.cards.push(c)
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
    index = this.cards.findIndex(t=> t.answer == '' || t.question == '')
    if (index == -1){
      return true
    }
    else return false
  }
}
