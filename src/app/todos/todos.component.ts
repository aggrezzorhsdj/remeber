import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ITodos } from '../interfaces/todos.interface';
import {TodosService} from '../services/todos/todos.service';
import {EditorService} from '../services/editor/editor.service';
import {IShow} from '../interfaces/show.interface';
import {IResponse} from '../interfaces/response.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.less'],
  providers: [TodosService]
})
export class TodosComponent implements OnInit {
  constructor(private TSService: TodosService, private EService: EditorService) { }
  ngOnInit(): void {
  }
  toggleEditor(type?: string, todo?: ITodos): void {
    this.EService.toggleShowEditor({type, isShow: true});
  }
}
