import { Pipe,PipeTransform } from '@angular/core';

//@Pipe({name: 'screenUser', pure:false})
@Pipe({name: 'screenUser'})
export class ScreenUserPipe implements PipeTransform {
    transform(users: string[]) :string[] {
   console.log('Executing pipe...info sent to pipe is:',users);
     //  return users.filter(name => name != "Butthead");
     return users.filter(this.showUser);
        
    }


    showUser(el:string) {
        console.log('processing', el);
        el != "Butthead" ? console.log('Good name:', el) : console.log('Bad name', el);
        return el != "Butthead";
    }
} 