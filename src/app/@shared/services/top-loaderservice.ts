import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopLoaderservice {
public loader = new BehaviorSubject<boolean>(false);

  constructor() { }

  show(){
    this.loader.next(true);
  };
  
  hide(){
    this.loader.next(false);
  };
  
  showHideLoader(){
    return this.loader
  };

}

