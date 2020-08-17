import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IShow} from '../../interfaces/show.interface';


@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor() { }
  public obs = new Subject<IShow>();
  toggleShowEditor(show?: IShow): Observable<IShow> {
    this.obs.next(show);
    return this.obs;
  }
}
