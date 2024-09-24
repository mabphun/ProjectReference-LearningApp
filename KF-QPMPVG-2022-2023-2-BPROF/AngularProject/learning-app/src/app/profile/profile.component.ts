import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../_models/appuser';
import { LearningSet } from '../_models/learning-set';
import { Card } from '../_models/card';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userid: string = ''
  url:string = 'http://localhost:5127/AppUser/'
  setUrl: string = 'http://localhost:5127/LearningSet/'
  http: HttpClient
  user: AppUser
  mostPlayedSet: LearningSet

  constructor(http: HttpClient){
    this.http = http
    this.user = new AppUser()
    this.mostPlayedSet = new LearningSet()
  }

  ngOnInit(): void {

    let tempUserId = localStorage.getItem('userid')
    if (tempUserId != null){
      this.userid = tempUserId
    }
    else{
      this.userid = 'Userid'
    }

    this.url = this.url + this.userid

    this.http
    .get<AppUser>(this.url)
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

      this.user = tempUser
      //console.log(this.user);
      
    })
  }

  getPrivateSets() : number{
    let result = this.user.ownedSets.filter(x=> x.isPrivate).length
    return result
  }

  getPublicSets() : number{
    let result = this.user.ownedSets.filter(x=> !x.isPrivate).length
    return result
  }

}
