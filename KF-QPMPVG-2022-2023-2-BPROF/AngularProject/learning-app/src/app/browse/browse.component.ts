import { Component, OnInit } from '@angular/core';
import { LearningSet } from '../_models/learning-set';
import { HttpClient } from '@angular/common/http';
import { Card } from '../_models/card';
import { AppUser } from '../_models/appuser';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  userUrl:string = 'http://localhost:5127/AppUser'
  http: HttpClient
  sets: Array<LearningSet>
  users: Array<AppUser>

  constructor(http: HttpClient){
    this.http = http
    this.sets = []
    this.users = []
  }
  
  ngOnInit(): void {
    this.http
    .get<Array<AppUser>>(this.userUrl)
    .subscribe(respUser =>{
      respUser.map(y=> {
        let user = new AppUser()
        user.id = y.id
        user.userName = y.userName
        user.image = y.image
        user.email = y.email
        y.ownedSets.map(x=>{
          let s = new LearningSet()
          s.id = x.id
          s.name = x.name
          s.description = x.description
          s.isPrivate = x.isPrivate
          s.ownerId = x.ownerId
          x.cards.map(z => {
            let c = new Card()
            c.id = z.id
            c.question = z.question
            c.answer = z.answer
            c.image = z.image
            c.learningSetId = z.learningSetId

            s.cards.push(c)
          })
          this.sets.push(s)
          user.ownedSets.push(s)
        })

        this.users.push(user)
        
      })
      console.log(this.users);
    })
  }

  getOwnerName(userId: string) : string{
    let username = this.users.find(x=> x.id == userId)?.userName
    
    if (username != null){
      return username
    }
    else return 'Unknown User'
  }
}
