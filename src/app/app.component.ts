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
  observeUsers: string[] = [];

  

 

  filterButthead(users:string[]): string[] {
    //console.log('executing filterButthead with', users);

    return users.filter(name => name != "Butthead");

  }
 

  constructor(private daoService:DaoService) {}

  updateData(el: any[]) : void {

      console.log('update in data in updateData with value', el, 'slicing with return value',el.slice(0));
     // this.observeUsers = el.map(x => x);
     
  //   this.observeUsers = el.slice(0);
  this.observeUsers = el;
  
  }

  updateDataValues(el:string) : void {

    console.log('update in data in updateData with value', el);
   
   

      this.observeUsers.push(el);

}



 ngOnInit() {
  // this.users = this.daoService.getUsers();

   //this.getObNames();

   const observer = {

    //next: names =>  { console.log('observer -> next: names are in getObNames in observer object :', names); this.observeUsers = names; },
   next: names =>  { console.log('names are in getObNames in observer object :', names);
                      names.push('World');
                      this.updateData(names); },
    error: err => console.log('Observer received an error '+err),
    complete: () => console.log('Observer got a complete notification')
  };


  const observerByValue = {

    //next: names =>  { console.log('observer -> next: names are in getObNames in observer object :', names); this.observeUsers = names; },
   next: name =>  { console.log('Received in observerByValue value :', name);
                      
                      this.updateDataValues(name); },
    error: err => console.log('Observer received an error '+err),
    complete: () => console.log('Observer got a complete notification')
  };


  const genericObserver = {

      next: item =>  { console.log('Received in genericObserver :', item); },                   
                     
    error: err => console.log('genericObserver received an error '+err),
    complete: () => console.log('genericObserver got a complete notification')
  };

  const throwErrorObserver = {

    next: item =>  { console.log('Received in genericObserver :', item); },                   
                   
  error: err => console.log('genericObserver received an error '+err),
  complete: () => console.log('genericObserver got a complete notification')
};


 // const busyValuesByRefernece = this.daoService.obGetUsers().subscribe(observer);

 
// const busyValues = this.daoService.obGetUsersByValue().subscribe(observerByValue);
   
//const genericBusy = this.daoService.genericCreateObservableScan().subscribe(genericObserver);

//const standAlone = this.daoService.standAlonePipe().subscribe(genericObserver);


//Original event stream is interrupted but since the thrown error is caught and emitted gracefully, the subscribe handler 'error' is not invoked
//const throwError = this.daoService.throwErrorObservable().subscribe(throwErrorObserver);


//Note that the subscribe  object invokes the 'error' callback.  The thrown error bubbles up to the error callback
//also uses finalize()
const throwError = this.daoService.throwErrorObservable2().subscribe(throwErrorObserver);

   
 }


}
