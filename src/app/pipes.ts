import { Pipe,PipeTransform } from '@angular/core';

@Pipe({name: 'screenUser'})
export class ScreenUserPipe implements PipeTransform {
    transform(users: string[]) {
   console.log('Executing pipe...info sent to pipe is:',users);
       return users.filter(name => name != "Butthead");
        
    }
} 