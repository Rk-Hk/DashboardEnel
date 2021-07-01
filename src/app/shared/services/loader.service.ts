import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { LoaderState } from '../models/loader.model';


@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  public loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {
  }

  show(protect?: boolean) {
    this.loaderSubject.next(<LoaderState>{show: true, showProtect: protect});
  }

  hide() {
    this.loaderSubject.next(<LoaderState>{show: false});
  }
}
