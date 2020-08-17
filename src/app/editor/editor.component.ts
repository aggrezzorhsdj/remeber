import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {TodosService} from '../services/todos/todos.service';
import {EditorService} from '../services/editor/editor.service';

import {ITodos} from '../interfaces/todos.interface';
import {IShow} from '../interfaces/show.interface';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
})
export class EditorComponent implements OnInit {
  constructor(private fb: FormBuilder, private TSService: TodosService, private ESService: EditorService) { }
  public show: IShow;
  formEditor: FormGroup;
  ngOnInit(): void {
    this.formEditor = this.fb.group({
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });
    this.ESService.toggleShowEditor({type: 'Edit', isShow: false})
        .subscribe(obs => {
          this.show = obs;
          if (this.show.isTodo) {
            const date = new Date(this.show.isTodo.date).toISOString().substring(0, 10);
            this.formEditor.get('title').setValue(this.show.isTodo.title);
            this.formEditor.get('date').setValue(date);
          }
        });
  }
  toggleShowEditor() {
    this.ESService.toggleShowEditor({isShow: false});
    this.formEditor.reset();
  }
  onSubmit(e): void {
    const todo: ITodos = {
      _id: this.show.isTodo ? this.show.isTodo._id : new Date().getTime(),
      title: this.formEditor.get('title').value,
      date: new Date(this.formEditor.get('date').value),
      completed: false,
    };
    if (this.show.isTodo) {
      todo.completed = this.show.isTodo.completed;
      this.TSService.setTodo(todo);
    } else {
      this.TSService.addTodo(todo);
    }
    this.ESService.toggleShowEditor({isShow: false});
    this.formEditor.reset();
  }
}
