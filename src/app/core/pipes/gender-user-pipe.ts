import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderUser',
})
export class GenderUserPipe implements PipeTransform {
  transform(userName: string, gender: string): string {
    if(gender=='female'){
      return 'Miss /'+userName
    }else{return 'Mr '+userName}
  }
}
