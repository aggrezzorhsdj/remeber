import { Injectable } from '@angular/core';
import { ITodos } from '../../interfaces/todos.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IResponse} from '../../interfaces/response.interface';
@Injectable()

export class TodosService {
  constructor(private http: HttpClient) {
  }
  public api = environment.apiUrl;
  public getTodos(): Observable<IResponse> {
    const api = this.api + '/todos';
    return this.http.get<IResponse>(api);
  }
  public getTodo(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.api}/todos/${id}`);
  }
  public setTodo(todo: ITodos): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.api}/todos/${todo._id}`, {
      title: todo.title,
      completed: todo.completed,
      date: todo.date
    });
  }
  public addTodo(todo: ITodos): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.api}/todos/`, {
      title: todo.title,
      completed: todo.completed,
      date: todo.date
    });
  }
  public removeTodo(id: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.api}/todos/${id}`);
  }
}
