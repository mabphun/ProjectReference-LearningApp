import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LearningSet } from '../_models/learning-set';
import { Card } from '../_models/card';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-own-sets',
  templateUrl: './own-sets.component.html',
  styleUrls: ['./own-sets.component.scss']
})
export class OwnSetsComponent implements OnInit {

  setUrl:string = 'http://localhost:5127/LearningSet'

  http: HttpClient
  sets: Array<LearningSet>
  selectedToDelete: LearningSet
  
  show: boolean
  alertColor: string
  alertMessage: string


  constructor(http: HttpClient){
    this.http = http
    this.sets = []
    this.selectedToDelete = new LearningSet()

    this.show = false
    this.alertColor = ''
    this.alertMessage = ''
  }
  
  private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}

  ngOnInit(): void {
    this.http
    .get<Array<LearningSet>>(this.setUrl)
    .pipe(catchError(this.handleError))
    .subscribe(resp =>{
      let userId = localStorage.getItem('userid')
      //userId = '3747f7bf-62b7-4fc3-8602-48f6824c00f5'

      resp.filter(y=> y.ownerId == userId).map(x => {
        let s = new LearningSet()
          s.id = x.id
          s.name = x.name
          s.description = x.description
          s.isPrivate = x.isPrivate
          s.ownerId = x.ownerId
          x.cards.map(y=> {
            let c = new Card()
              c.id = y.id
              c.question = y.question
              c.answer = y.answer
              c.image = y.image
              c.learningSetId = y.learningSetId

              s.cards.push(c)
          })
          this.sets.push(s)
      })
      console.log(this.sets);
    })
  }

  public showAlert(msg: string, colorInput: string) : void {
    this.alertColor = 'alert-' + colorInput // alert-danger
    this.alertMessage = msg
    this.show = true
  }

  public alertClosed() : void {
    this.show = false
  }

  selectToDelete(delSet: LearningSet) : void{
    this.selectedToDelete = delSet
    console.log(this.selectedToDelete);
  }

  deleteSet() : void{
    // Delete
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    this.http
      .delete(
        this.setUrl + '/' + this.selectedToDelete.id,
        { headers: headers}
        )
      .subscribe(resp =>{
        let index = this.sets.findIndex(x=>x.id === this.selectedToDelete.id)
        this.sets.splice(index, 1)
        this.showAlert('Delete was successful!', 'success')
        this.selectedToDelete = new LearningSet()
      });
    
    
  }
}