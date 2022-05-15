import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public selectedAlgorithmSubject = new BehaviorSubject('');
  public triggerVisualize = new BehaviorSubject(false);

  public boardTriggers : BehaviorSubject<string> = new BehaviorSubject('');

  public animateSpeedSubject: BehaviorSubject<number> = new BehaviorSubject(20); 

  constructor() { }
}
