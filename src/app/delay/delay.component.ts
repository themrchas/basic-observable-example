import { Component, OnInit } from '@angular/core';

import { DaoService } from '../dao.service';
//import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.css']
})
export class DelayComponent implements OnInit {

  doHide:boolean = true;

  constructor(private daoService:DaoService) { }

  ngOnInit() {
  }

  startAction() {

    
    console.log('delay.component startAction: startAction button has been pressed');

    const observer = {

      next: item =>  { console.log('startAction: Received emitted value:',item); },                   
                     
    error: err => console.log('startAction: received an error '+err),
    complete: () => { console.log('startAction: got a complete notification'); this.doHide = false; }
  
  };

    const selfMadeObservable = this.daoService.actuateSpinner().subscribe(observer);

  }

}
