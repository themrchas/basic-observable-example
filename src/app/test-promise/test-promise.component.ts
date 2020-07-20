import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from, timer, EMPTY } from 'rxjs';
import { tap, map, expand, take, scan, last} from 'rxjs/operators';


@Component({
  selector: 'app-test-promise',
  templateUrl: './test-promise.component.html',
  styleUrls: ['./test-promise.component.css']
})
export class TestPromiseComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {}  


  //Turn on sp-rest-proxy 
  private httpHeaders = new HttpHeaders().set('Accept','application/json; odata=verbose');
  
  
  //Make standard REST call to a SP list with a limit on number of items to return
  private makeRESTCall(endpoint?:string): Observable<any>  {

    let rowLimit:number = 5;

    let restEndPoint: string = endpoint || "http://localhost:8080/sites/dev/socafdev/_api/web/lists/getbytitle('Awards Matrix Slide')/items?$top="+rowLimit;


    return this.httpClient.get(restEndPoint, {headers: this.httpHeaders})
      .pipe(
            tap(val => console.log('test-promise:makeRESTCall tap: Http call returned', val))
           )
  }


  /****Start grab data using REST and Observable *******/
  //Query a list using httpClient and returning results in an observable
  private makeRESTCallPromise(): Promise<any>  {

    let restEndPoint: string = "http://localhost:8080/sites/dev/socafdev/_api/web/lists/getbytitle('Awards Matrix Slide')/items";


    return this.httpClient.get(restEndPoint, {headers: this.httpHeaders})
      .pipe(
            tap(val => console.log('test-promise:makeRESTCall tap: Http call returned', val))
           ).toPromise()
  }


  //Uses 'expand' to recusively call and collect REST data
  private getListDataRecurse() {

     this.makeRESTCall()
          .pipe(
                expand(data => {

                //  console.log('test-promise: getListDataRecurse: tap REST call returned', data);

                //If the REST call results provide a '__next', we query that endpoint again
                  if (data.d.__next) {
                        return this.makeRESTCall(data.d.__next);
                  }
                  else
                    return EMPTY;
                   
               }),

               //Create an array that contains all of the items we have pulled in REST call
               scan((acc,curr) => { console.log('acc is',acc); return acc.concat(curr.d.results) }, []),

               //We are interested in only the last item created in 'scan', as that contains everything in All REST calls
               last()


    ).subscribe(data => console.log('test-promise: getListDataRecurse: Data is', data));


  }


  //Make generic call using REST
  private getListData() {
    
    this.makeRESTCall().subscribe(this.subscriber);
  }

  /******* End grab data using REST and Observable ********/






  private getListDataPromise() {
    this.makeRESTCallPromise().then(function(data) {
      console.log("test-promise:getListDataPromise: data", data);
    })
  }


  
  private subscriber =  {

    next: item =>  { console.log('test-promise-component:subscriber: Received :', item); },                   
    error: err => console.log('test-promise-component: subscriber:  Received an error '+err),
    complete: () => console.log('test-promise-component: subscriber: Got a complete notification')
  };

  private subscriberRecursive =  {

    next: item =>  { console.log('test-promise-component:subscriber: Received :', item); },                   
    error: err => console.log('test-promise-component: subscriber:  Received an error '+err),
    complete: () => console.log('test-promise-component: subscriber: Got a complete notification')
  };
  


  queryObservable(btn:any) {
    this.generateData().subscribe(this.subscriber);
  }

 
  

/**** Example of generating Observable data *****/
  generateData(): Observable<unknown> {

       
    function sequenceSubscriber(observer) {

      // synchronously deliver 1, 2, and 3, then complete
      observer.next("Beavis");
      observer.next("Butthead");
      observer.next("Mr. Anderson");

      setTimeout(function() { observer.complete() }, 5000);
     
    }

    // Create a new Observable that will deliver the above sequence
    const sequence = new Observable(sequenceSubscriber);

    return sequence;

  }
/* end example */


/******Example of converting Observables into promies and returning the results in one Promise */
  queryPromises(btn:any) {
    this.generatePromises().then(function(data) {
      console.log('queryPromises: data is', data);
    })
  }

 
  generatePromises(): Promise<Array<string>> {

      return Promise.all([
        of("Beavis").toPromise(),
        of("Butthead").toPromise(),
        of("Mr. Anderson").toPromise()
      ]);

  }

  /******End example *******/ 

//Uses expand and take to demonstrate how to use expand
  testExpand() {

    const source = of(2);
    const example = source.pipe(
  //recursively call supplied function
  expand(val => {
    //2,3,4,5,6
    console.log(`Passed value: ${val}`);
    //3,4,5,6
    return of(1 + val);
  }),
  //call 5 times
  take(5)
);
    /*
      "RESULT: 2"
      "Passed value: 2"
      "RESULT: 3"
      "Passed value: 3"
      "RESULT: 4"
      "Passed value: 4"
      "RESULT: 5"
      "Passed value: 5"
      "RESULT: 6"
      "Passed value: 6"
    */
    //output: 2,3,4,5,6
    const subscribe = example.subscribe(val => console.log(`RESULT: ${val}`));

  }

/*  Expand example  
* This example uses a secondary function to generate the observable being processed by expand
* Note that the emitted value received by subscriber does NOT wait for tap to complete.  It immediately receives observable.
*/

  testHybridExpand() {

    this.testHybridEmitter(1).pipe(
    
    //tap( val =>  setTimeout(function(val) { console.log('Tapped value is', val) }, 5000, val)   )  => 
    expand(val => {
      console.log('test-promise: testHybridExpand: expand received value:', val);
      if (val < 4)
        return this.testHybridEmitter(val)
      else
        return EMPTY;
    })

    ).subscribe(val => console.log('test-promise: testHybridExpand: Emitted value is', val))

}


//Emit passed number plus 1
testHybridEmitter(toEmit: number): Observable<number> {
    console.log('test-promise: testHybridEmitter: received value:', toEmit);
    toEmit++;
    console.log('test-promise: testHybridEmitter: emitting value:', toEmit);
    return of(toEmit);
}

/****** End expand example ******/


  //Example showing how RxJS timer emits an Observable every half a second
timerEmit() {

  const numbers = timer(500,500);
  numbers.subscribe(x => console.log('timer emitted ',x));

}







}
