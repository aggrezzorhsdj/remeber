import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { ITodos } from '../interfaces/todos.interface';
import {TodosService} from '../services/todos/todos.service';
import {EditorService} from '../services/editor/editor.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less'],
})
export class TodoComponent implements OnInit, OnDestroy {
  public todos$: Observable<ITodos[]>;
  constructor(private TSService: TodosService, private ESService: EditorService) {}
  ngOnInit(): void {
    this.getTodos();
  }
  public getTodos(): void {
    this.todos$ = this.TSService.getTodos();
  }
  public onTodoChecked(todo: ITodos): void {
    const subCheck = this.TSService.setTodo({
      _id: todo._id,
      completed: !todo.completed,
      title: todo.title,
      date: todo.date
    });
  }

  public todoRemove(id: number): void {
    const subRemove = this.TSService.removeTodo(id);
  }

  public setTodo(todo: ITodos): void {
    this.ESService.toggleShowEditor({isShow: true, isTodo: todo, type: 'Edit'});
  }
  ngOnDestroy() {
  }
}
