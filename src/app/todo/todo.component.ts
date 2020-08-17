import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { ITodos } from '../interfaces/todos.interface';
import {TodosService} from '../services/todos/todos.service';
import {EditorService} from '../services/editor/editor.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less'],
})
export class TodoComponent implements OnInit, OnDestroy {
  public todos: ITodos[];
  public subscribtion;
  constructor(private TSService: TodosService, private ESService: EditorService) {}
  ngOnInit(): void {
    this.getTodos();
  }
  public getTodos(): void {
    this.subscribtion = this.TSService.getTodos().subscribe((res) => {
      this.todos = res.data;
    });
  }
  public onTodoChecked(todo: ITodos): void {
    const subCheck = this.TSService.setTodo({
      _id: todo._id,
      completed: !todo.completed,
      title: todo.title
    }).subscribe((res) => {
      if (res.status === 'success') {
        this.getTodos();
      }
      subCheck.unsubscribe();
    });
  }

  public todoRemove(id: number): void {
    const subRemove = this.TSService.removeTodo(id).subscribe((res) => {
      console.log(res);
      if (res.status === 'success') {
        this.getTodos();
      }
      subRemove.unsubscribe();
    });
  }

  public setTodo(todo: ITodos): void {
    this.ESService.toggleShowEditor({isShow: true, isTodo: todo, type: 'Edit'});
  }
  ngOnDestroy() {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }
}
