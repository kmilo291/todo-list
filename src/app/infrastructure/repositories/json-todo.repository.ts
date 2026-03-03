import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoRepository } from 'src/app/core/ports/todo.repository';
import { Todo } from 'src/app/core/models/shared/todo.model';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JsonTodoRepository implements TodoRepository {

  constructor(private http: HttpClient) {}

  async getAll(): Promise<Todo[]> {
    return await firstValueFrom(
      this.http.get<Todo[]>('assets/data/todos.json')
    );
  }

  async save(): Promise<void> {
    throw new Error('Solo lectura');
  }

  async delete(): Promise<void> {
    throw new Error('Solo lectura');
  }

  async update(): Promise<void> {
    throw new Error('Solo lectura');
  }
}
