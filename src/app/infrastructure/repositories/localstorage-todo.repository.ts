import { Injectable } from '@angular/core';
import { Todo } from 'src/app/core/models/shared/todo.model';
import { TodoRepository } from 'src/app/core/ports/todo.repository';

@Injectable()
export class LocalStorageTodoRepository implements TodoRepository {

  private storageKey = 'todos';

  async getAll(): Promise<Todo[]> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  async save(todo: Todo): Promise<void> {
    const todos = await this.getAll();
    localStorage.setItem(this.storageKey, JSON.stringify([...todos, todo]));
  }

  async delete(id: number): Promise<void> {
    const todos = await this.getAll();
    const filtered = todos.filter(t => t.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }

  async update(todo: Todo): Promise<void> {
    const todos = await this.getAll();
    const updated = todos.map(t =>
      t.id === todo.id ? todo : t
    );
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

}
