import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DaoService } from "../dao.service";
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  name:string;
  count: number;

  sendUserName(): void {

    console.log('Will add user '+this.name);
    this.daoService.updateUsers(this.name);
  }

  constructor(private daoService:DaoService) { }

  ngOnInit() {
   // this.name = "Jan";
    this.count++;
  }

}
