import { Injectable } from '@angular/core';
import { ITodos } from '../../interfaces/todos.interface';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IResponse} from '../../interfaces/response.interface';
import {catchError, tap} from 'rxjs/operators';
@Injectable()

export class TodosService {
  constructor(private http: HttpClient) {
  }
  public api = environment.apiUrl;
  public todos = new Subject<ITodos[]>();
  public getTodos(): Observable<ITodos[]> {
    const api = this.api + '/todos';
    this.http.get<IResponse>(api)
        .pipe(
            tap(_ => console.log('fetched data')),
            catchError(this.handleError<IResponse>('get Todos', {status: 'error', message: ''}))
        )
        .subscribe((res) => {
      this.todos.next(res.data);
    });
    return this.todos;
  }
  public getTodo(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.api}/todos/${id}`).pipe(
        tap(_ => console.log('fetched data on todo ' + id)),
        catchError(this.handleError<IResponse>('get Todo on id ' + id, {status: 'error', message: 'Error with todo ' + id}))
    );
  }
  public setTodo(todo: ITodos): void {
    this.http.put<IResponse>(`${this.api}/todos/${todo._id}`, {
      title: todo.title,
      completed: todo.completed,
      date: todo.date
    })
        .pipe(
            tap(_ => console.log('setting todo')),
            catchError(this.handleError<IResponse>('setting Todo', {status: 'error', message: 'Error setting todo on id ' + todo._id}))
        )
        .subscribe((res) => {
          this.getTodos();
        });
  }
  public addTodo(todo: ITodos): void {
    this.http.post<IResponse>(`${this.api}/todos/`, {
      title: todo.title,
      completed: todo.completed,
      date: todo.date
    })
        .pipe(
            tap(_ => console.log('adding todo')),
            catchError(this.handleError<IResponse>('adding Todo', {status: 'error', message: 'Error adding todo on id ' + todo._id}))
        )
        .subscribe((res) => {
          this.getTodos();
        });
  }
  public removeTodo(id: number): void {
    this.http.delete<IResponse>(`${this.api}/todos/${id}`)
        .pipe(
            tap(_ => console.log('remove todo')),
            catchError(this.handleError<IResponse>('remove Todo', {status: 'error', message: 'Error removing todo on id ' + id}))
        )
        .subscribe((res) => {
          this.getTodos();
        });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // TODO: make the service that will be notify user on errors
  // private log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // }
}
