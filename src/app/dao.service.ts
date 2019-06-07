import { Injectable } from '@angular/core';

//pipe is for stand aline pipe, not method of Observable
import { Observable, of, pipe, from, throwError } from 'rxjs';    


import { map, filter, scan, catchError, tap} from 'rxjs/operators';
import { validateConfig } from '@angular/router/src/config';



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
    
        //Note that in this example, the array is passed by reference so any changes made by another component are made in this component as well.
        console.log('Executing obGetUsers in dao.service...');
        return of(this.dynamicUsers);
        
      //This will return a copy of the array, not a reference so dynamicUsers never changes due to passed reference in another component
     // return of(this.dynamicUsers.slice(0));
       
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

//Accumulate and emit value using scan
genericCreateObservableScan():Observable<number> {

  console.log('Executing genericCreateObservable in dao.service...');
  return of(1,2,3,4,5,6).pipe(scan((total,curr) => total+curr,0));

}


//Standalone pipe that can 'wrap' an observable
standAlonePipe():Observable<string> {

  const thePipe = pipe(
    map( (val: string) => (val != "Butthead") ? val : val+"   HeHeHeHe")
    
  );

  const postMap$ =  thePipe( from(["Beavis", "Butthead", "Daria", "Mr. Anderson"]) );

  return postMap$;

 
};


//Observable throwing error using stand alone pipe;  Processing will occur until error is thrown.
throwErrorObservable():Observable<string> {

  const thePipe = pipe(

    map( (val: string) => {

      if (val == "Butthead") { 
        throw new Error('Butthead found!')
      }

      return val;  //Note that this returns the value in an Observable
    }),

    catchError(err => {
      return of(err);
    })

  );
    
    return thePipe( from(["Beavis", "Butthead", "Daria", "Mr. Anderson"]) );
  
  }

  throwErrorObservable2():Observable<string> {

    const thePipe = pipe( 

   

  //In this example, an error is thrown which terminates the Observable stream.  The error function callback in subscribe will be invoked.
  /* map( (val:string) => {
        if (val == "Daria")
          throw new Error("Daria encountered in map");
        else
          return val;
    }) */

//Shows how to gracefully catch an error in the observable stream. The stream stops after error is thrown.
//Note that the subscribe function receives the error as a 'normal' emitted value vice an 'error' emitted value
    map( (val:string) => {
      if (val == "Daria")
        throw new Error("Daria encountered in map");
      else
        return val;
  }),
  catchError(err => {
   // console.log("Caught error",err);
    return of(err);
  })
  
  
    );
      
      return thePipe( from(["Beavis", "Butthead", "Daria", "Mr. Anderson"]) );

     // return pipeResult$;
    
    }




  tapPipe():Observable<string> {

    const thePipe = pipe(
      tap( (val:string) => console.log('Current tap value is ',val),
      map( (val:string) => val + "taped"))
    );

    const postMap$ =  thePipe( from(["Beavis", "Butthead", "Daria", "Mr. Anderson"]) );

    return postMap$;

  }



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
