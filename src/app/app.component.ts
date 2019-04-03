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

 /*getObNames(): void {

  //  this.daoService.obGetUsers().subscribe(names => this.observeUsers = names);
  //const busy = this.daoService.obGetUsers().subscribe(names => { console.log('names are in getObNames :',names); this.observeUsers = names;
 });

 busy.unsubscribe();

  } */

  filterButthead(users:string[]): string[] {
    //console.log('executing filterButthead with', users);

    return users.filter(name => name != "Butthead");

  }
 

  constructor(private daoService:DaoService) {}

  updateData(el: any) : void {

      console.log('update in data in updateData with value', el);
     // this.observeUsers = el.map(x => x);
     this.observeUsers = el;
  
  }


 ngOnInit() {
  // this.users = this.daoService.getUsers();

   //this.getObNames();

   const observer = {

    //next: names =>  { console.log('observer -> next: names are in getObNames in observer object :', names); this.observeUsers = names; },
   next: names =>  { console.log('names are in getObNames in observer object :', names); 
                      this.updateData(names); },
    error: err => console.log('Observer received an error '+err),
    complete: () => console.log('Observer got a complete notification')
  };


 

// const busy = this.daoService.obGetUsers().subscribe(names => { console.log('names are in getObNames :',names); this.observeUsers = names;
 //});

 const busy = this.daoService.obGetUsers().subscribe(observer);
 
 
 

 //setTimeout( function() {console.log('unsubscribing'); busy.unsubscribe(); }, 5000);


   
 }


}
