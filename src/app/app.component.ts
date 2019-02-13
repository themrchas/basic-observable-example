import { Component } from '@angular/core';

import { DaoService } from "./dao.service";
import { ScreenUserPipe } from "./pipes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'test-observable';
  users: string[];
  observeUsers: string[];

  getObNames(): void {

    this.daoService.obGetUsers().subscribe(names => this.observeUsers = names);

  }
 

  constructor(private daoService:DaoService) {}


 ngOnInit() {
   this.users = this.daoService.getUsers();

   this.getObNames();

   
 }


}
