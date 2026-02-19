import { Component } from '@angular/core';
import { Todo } from 'src/app/core/models/todo.model';
import { TodoRepository } from 'src/app/core/ports/todo.repository.ts';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  standalone: false
})
export class TodosPage {

  todos: Todo[] = [];

  constructor(private repo: TodoRepository) {}

  async ionViewWillEnter() {
    this.todos = await this.repo.getAll();
  }

  async addTodo() {
    const newTodo: Todo = {
      id: Date.now(),
      title: 'Nuevo Todo',
      completed: false
    };

    await this.repo.save(newTodo);
    this.todos = await this.repo.getAll();
  }
}
