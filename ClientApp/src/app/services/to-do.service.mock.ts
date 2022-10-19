import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ToDoItem } from '../models/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class ToDoServiceMock {

  getOne(id: string, todos: ToDoItem[]): ToDoItem | undefined {
    return todos.find(t => t.id === id);
  }

  createOne(body: ToDoItem, todos: ToDoItem[]): ToDoItem {
    const todo: ToDoItem = {
      ...body,
      id: uuidv4(),
      createTime: new Date().toISOString()
    };
    todos.push(todo);
    this.write(todos);
    return todo;
  }

  updateOne(id: string, body: ToDoItem, todos: ToDoItem[]): ToDoItem {
    const todo: ToDoItem | undefined = todos.find(t => t.id === id);
    if (todo) {
      todo.done = body.done;
      todo.description = body.description;
      this.write(todos);
      return todo;
    }
    else {
      return {
        'id': '',
        'description': '',
        'createTime': '',
        'done': true
      };
    }
  }

  deleteOne(id: string, todos: ToDoItem[]): Observable<string> {
    const index: number = todos.findIndex(t => t.id === id);
    todos.splice(index, 1);
    this.write(todos);
    return of(id);
  }

  private write(items: ToDoItem[]): void {
    localStorage.setItem('todos', JSON.stringify(items));
  }
}
