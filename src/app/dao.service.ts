import { Injectable } from '@angular/core';

//pipe is for stand aline pipe, not method of Observable
import { Observable, of, pipe, from, throwError, concat, Observer } from 'rxjs';    


import { map, filter, scan, catchError, tap, finalize, isEmpty, last, first} from 'rxjs/operators';
//import { validateConfig } from '@angular/router/src/config';




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
     //return of("Recovered from Butthead");
    })

  );
    
    return thePipe( from(["Beavis", "Butthead", "Daria", "Mr. Anderson"]) );
  
  }
  
//Observable throwing error using stand alone pipe;  Processing will occur until error is thrown.
//All observables returned from map() are processed by ther 'next' callback
throwErrorObservable2():Observable<string> {

  const thePipe = pipe(

    map( (val: string) => {

      if (val == "Butthead") { 
        throw new Error('Butthead found!')
        //return throwError('Butthead found');
    
      }

      return val;  //Note that this returns the value in an Observable
    }),
    finalize( () => console.log('Finalize statement executed'))

    
  );
    
    return thePipe( from(["Beavis", "Butthead", "Daria", "Mr. Anderson"]) );
  
  }

  tapPipe():Observable<string> {

    const thePipe = pipe(
      tap( (val:string) => console.log('Current tap value is ',val),
      map( (val:string) => val + "taped"))
    );

    const postMap$ =  thePipe( from(["Beavis", "Butthead", "Daria", "Mr. Anderson"]) );

    return postMap$;

  }

  testEmpty():Observable<boolean> {

    return from(['blah','blee']).pipe(
      tap( (val:string) => console.log('Tapped value in \'testEmpty\' is ',val) ),
      isEmpty()
    )};


    //Example of using last() with a predicate to grab values in which you are interested 
    getLastEmitted():Observable<string> {

      return from(['Beavis','Butthead','Daria','Beavis']).pipe(
        tap( (val:string) => console.log('Tapped value in \'getLastEmitted\' is ',val) ),
         
        last( (val:string,idx,obs)  =>  {  
          console.log('last: val is', val, 'index is', idx, 'Observable is',obs);
          return (val == "Beavis" || val == "Buttheads")})
      )
    } 


  //Emits an entire array
  /*  getLastEmitted():Observable<string[]> {

      return of(['Beavis','Butthead','Daria']).pipe(
        tap( (val:string[]) => console.log('Tapped value in \'getLastEmitted\' is ',val) ),
        last()
      )
    }  */


    //Emits first element that matches the predicate.  Note that as soon as the predicate is satisfied
    //the satisfying value is emitted and any other following values are not processed.
    getFirstEmitted():Observable<string> {

       return from(['Beavis 1','Butthead','Daria','Beavis 2']).pipe(
        tap( (val:string) => console.log('Tapped value in \'getFirstEmitted\' is ',val) ),
         
       first( (val:string,idx,obs)  =>  {  
          console.log('getFirstEmitted: val is', val, 'index is', idx, 'Observable is',obs);
          return val.includes("Beavis") })
      ) 
      
    
    } 


    //Example using first() with a predicate
    getFirstEmittedWithPredicate():Observable<string> {

      return from(['Beavis 1','Butthead','Daria','Beavis 2']).pipe(
       tap( (val:string) => console.log('Tapped value in \'getFirstEmitted\' is ',val) ),
      first (val => val.includes("2")))
   
   } 
   

    doConcat():Observable<string> {

      const pipe1 = pipe(
        map((x:string) => x)
      );

      const pipe2 = pipe(
        map((x:string) => x)
      );

       const pipe1$ = pipe1( from(['Marcia','Greg','Cindy']) );
       const pipe2$ = pipe2( from(['Beavis','Butthead','Mr. Anderson']) );

       return concat(pipe1$,pipe2$);
  
       
     

      //This works due to the ObservableInterface property for arrays? http://reactivex.io/rxjs/class/es6/MiscJSDoc.js~ObservableInputDoc.html
      //Based on docs, this accepts 'array-like' stuff and can convert to observables
      //return concat(['Marcia','Greg','Cindy'],['Beavis','Butthead','Mr. Anderson']);  This works
    

    }


  updateUsers(name: string): void {
    console.log('Adding user',name,'in dao.service');
    this.dynamicUsers.push(name);
    console.log('dynamicUsers in dao service are',this.dynamicUsers);

     let to = setTimeout( () =>  { console.log('Adding Ozzy to the list'); this.dynamicUsers.push('Ozzy Osbourne'); clearTimeout(to); }, 5000);
      

  }


  /****** Start functions used for controlling the progress spinner   */

  actuateSpinner(): Observable<unknown> {

    console.log('dao.service actuateSpinner: actuateSpinner button has been pressed');
    
    function sequenceSubscriber(observer) {
      // synchronously deliver 1, 2, and 3, then complete
      observer.next(1);
      observer.next(2);
      observer.next(3);

      setTimeout(function() { observer.complete() }, 5000);
     
    }

    // Create a new Observable that will deliver the above sequence
    const sequence = new Observable(sequenceSubscriber);

    return sequence;

  }


  /********End functions dealing with spinner */



 


  

  ngOnInit() { }


  constructor() { 

    this.dynamicUsers = ['Alice','Greg','Marcia','Bobby'];
   // this.dynamicUsers.push('Mrs Brady');

    //console.log('dao service constructor activated');
   // setTimeout( () =>  { console.log('Adding Mr. Brady to the list', this.dynamicUsers); this.updateUsers('Mr. Brady'); }, 5000);

  


  }
}
