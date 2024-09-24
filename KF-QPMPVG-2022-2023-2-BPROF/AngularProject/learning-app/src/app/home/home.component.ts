import { Component, OnDestroy, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { LearningSet } from '../_models/learning-set';
import { SetModel } from '../_models/setmodel';
import { ApiService } from '../api.service';

const connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5127/events',{
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  setModels: Array<SetModel>
  api: ApiService

  constructor(api:ApiService){
    this.setModels = []
    this.api = api
  
  }

  ngOnDestroy(): void {
      connection.stop().then(()=>{
        console.log('SignalR Disconnected!');
      })
  }

  ngOnInit(): void {
    connection.start().then(() => {
      console.log('SignalR Connected!');
    }).catch((err) => {
      console.log('SignalR Connection Error: ' + err);
    });
    
    
    connection.on('Connected', (connId: string) => {
      console.log('Connection id:', connId);
    });

    connection.on('setCreated', (ownerName: string, set: LearningSet) => {
      let sm = new SetModel()
      sm.ownerName = ownerName
      sm.set = set
      sm.alertColor = 'alert-success'
      sm.action = 'created'
      sm.icon = 'fa-plus'
      this.setModels.push(sm)
    });

    connection.on('setEdited', (ownerName: string, set: LearningSet) => {
      let sm = new SetModel()
      sm.ownerName = ownerName
      sm.set = set
      sm.alertColor = 'alert-warning'
      sm.action = 'edited'
      sm.icon = 'fa-pen-to-square'
      this.setModels.push(sm)
    });

    connection.on('setDeleted', (ownerName: string, set: LearningSet) => {
      let sm = new SetModel()
      sm.ownerName = ownerName
      sm.set = set
      sm.alertColor = 'alert-danger'
      sm.action = 'deleted'
      sm.icon = 'fa-trash'
      this.setModels.push(sm)
    });
  }
}
