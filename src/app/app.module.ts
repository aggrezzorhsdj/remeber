import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { EditorComponent } from './editor/editor.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TodosService} from './services/todos/todos.service';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoComponent,
    EditorComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule
  ],
  providers: [HttpClientModule, TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
