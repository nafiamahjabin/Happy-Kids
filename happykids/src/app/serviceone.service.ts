import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceoneService {
  myMethod$: Observable<any>;
  getquizTitle$: Observable<any>;
  getstandingData$: Observable<any>;
  getProfile$: Observable<any>;
  getPoem$: Observable<any>;
  private myMethodSubject = new BehaviorSubject<any>("");
  private quizTitleSubject = new BehaviorSubject<any>("");
  private getStandingDataSubject = new BehaviorSubject<any>("");
  private getProfileDataSubject = new BehaviorSubject<any>("");
  private getPoemDataSubject = new BehaviorSubject<any>("");
  constructor() {
    this.myMethod$ = this.myMethodSubject.asObservable();
    this.getquizTitle$ = this.quizTitleSubject.asObservable();
    this.getstandingData$ = this.getStandingDataSubject.asObservable();
    this.getProfile$ = this.getProfileDataSubject.asObservable();
    this.getPoem$ = this.getPoemDataSubject.asObservable();
   }
   myMethod(data)
   {
     this.myMethodSubject.next(data);

   }
   getquizTitle(data)
   {
     this.quizTitleSubject.next(data);
   }
   getStandingData(data)
   {
     this.getStandingDataSubject.next(data);
   }
   getProfiledata(data)
   {
     this.getProfileDataSubject.next(data);
   }
   getPoemData(data:any)
   {
     this.getPoemDataSubject.next(data);
   }
}
