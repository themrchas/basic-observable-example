import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DaoService {

  dynamicUsers: string[];

   getUsers():string[] {

    return ['Beavis','Butthead','Mr. Anderson','Stewart'];
  }

  obGetUsers():Observable<string[]> {

        return of(this.dynamicUsers);
  }

  updateUsers(name: string): void {

    this.dynamicUsers.push(name);
  }

  ngOnInit() {}

    



  constructor() { 

    this.dynamicUsers = ['Alice','Greg','Marcia','Bobby'];


  }
}
