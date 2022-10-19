import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ToDoItem } from '../models/ToDoItem';
import { HttpService } from '../core/http.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private apiUrl: string = 'http://localhost:5225/api/v2/items'

  constructor(private http: HttpService) {}

  getAll(): Observable<ToDoItem[]>{
    console.log(this.apiUrl);
    return this.http.get(`${this.apiUrl}`)
  }

  getOne(id: string): Observable<ToDoItem | never> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  createOne(body: ToDoItem): Observable<ToDoItem> {
    const todo: ToDoItem = {
      ...body,
      id: uuidv4(),
      createTime: new Date().toISOString()
    };
    return this.http.post(`${this.apiUrl}`, todo)
  }

  updateOne(id: string, body: ToDoItem): Observable<ToDoItem | never> {
    return this.http.put(`${this.apiUrl}/${id}`, body)
  }

  deleteOne(id: string): Observable<string> {
    return this.http.remove(`${this.apiUrl}/${id}`, {})
  }

  // private read(): ToDoItem[] {
  //   const todosString: string | null = localStorage.getItem('todos');
  //   try {
  //     const todos: ToDoItem[] = todosString ? JSON.parse(todosString) : [];
  //     return (Array.isArray(todos) && todos) || [];
  //   } catch (e) {
  //     return [];
  //   }
  // }

  // private write(items: ToDoItem[]): void {
  //   localStorage.setItem('todos', JSON.stringify(items));
  // }
}
