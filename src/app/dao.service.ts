import { Injectable } from '@angular/core';
import { Observable, of, from, pipe} from 'rxjs';
import { map, filter, scan, } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class DaoService {

  dynamicUsers: string[];

   getUsers():string[] {

    return ['Beavis','Butthead','Mr. Anderson','Stewart'];
  }


  //Emit object
  obGetUsers():Observable<string[]> {
    
        console.log('Executing obGetUsers in dao.service...');
        return of(this.dynamicUsers);
      //return of(this.dynamicUsers.slice(0));
       
  }

  //Emit as values
  obGetUsersByValue():Observable<string> {
    
    console.log('Executing obGetUsersByValue in dao.service...');

    //Example of getting value from Observable, applying a map transform, filtering, and re-packaging into Observable
    return from(this.dynamicUsers).pipe( map(val => val + " from Brady Bunch"), 
       filter(val => !val.includes("Marcia")) );


    // Return a copy of the dynamicUsers array;  this breaks any type of reference to the array 
    //return of(this.dynamicUsers.slice(0));
   
}

//Accumulate and emit value
genericCreateObservableScan():Observable<number> {

  console.log('Executing genericCreateObservable in dao.service...');
  return of(1,2,3,4,5,6).pipe(scan((total,curr) => (total+curr),0));

}


genericStandAlonePipe():Observable<string> {

  const thePipe = pipe(
    map(val => (val != "Butthead") ? val : val+"HeHeHeHe")
    
  );

  const postMap$ =  thePipe( of(["Beavis", "Butthead", "Daria", "Mr. Anderson"]) );

  return postMap$;
};





  updateUsers(name: string): void {
    console.log('Adding user',name,'in dao.service');
    this.dynamicUsers.push(name);
    console.log('dynamicUsers in dao service are',this.dynamicUsers);

     let to = setTimeout( () =>  { console.log('Adding Ozzy to the list'); this.dynamicUsers.push('Ozzy Osbourne'); clearTimeout(to); }, 5000);
      

  }


  

  ngOnInit() { }


  constructor() { 

    this.dynamicUsers = ['Alice','Greg','Marcia','Bobby'];
   // this.dynamicUsers.push('Mrs Brady');

    //console.log('dao service constructor activated');
   // setTimeout( () =>  { console.log('Adding Mr. Brady to the list', this.dynamicUsers); this.updateUsers('Mr. Brady'); }, 5000);

  


  }
}
