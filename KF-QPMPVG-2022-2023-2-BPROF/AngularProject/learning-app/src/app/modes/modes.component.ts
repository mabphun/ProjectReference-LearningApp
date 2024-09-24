import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modes',
  templateUrl: './modes.component.html',
  styleUrls: ['./modes.component.scss']
})
export class ModesComponent implements OnInit {
  
  http: HttpClient
  route: ActivatedRoute
  setId: string

  constructor(http: HttpClient, route: ActivatedRoute) {
    this.http = http
    this.route = route
    this.setId = ''
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.setId = param['id']
    })
  }

}
