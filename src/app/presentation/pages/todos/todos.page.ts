import { Component, OnInit } from '@angular/core';
import { TodoWithCategory } from 'src/app/core/models/projections/todo-with-category.model';
import { GetTodosWithCategory } from 'src/app/core/use-cases/get-todos-with-category.use-case';
import { CreateTodo } from 'src/app/core/use-cases/create-todo.use-case';
import { DeleteTodo } from 'src/app/core/use-cases/delete-todo.use-case';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  standalone: false
})
export class TodosPage implements OnInit{

  todos: TodoWithCategory[] = [];

  constructor(
    private getTodosWithCategory: GetTodosWithCategory,
    private createTodo: CreateTodo,
    private deleteTodo: DeleteTodo
  ) {}


  async ngOnInit() {
         console.log('TODOS PAGE INIT');
    await this.loadTodos();
  }

  async ionViewWillEnter() {
    await this.loadTodos();
  }

  async loadTodos() {
    this.todos = await this.getTodosWithCategory.execute();
  }

  async addTodo() {
    console.log('click')

    const result = await this.createTodo.execute({
      title: 'Nuevo Todo',
      categoryId: 1
    });

    if (!result.success) {
      console.error(result.error);
      return;
    }

    await this.loadTodos();
  }

  async delete(idTodo: number){
    const result = await this.deleteTodo.execute({ id: idTodo });

    if (!result.success) {
      console.error(result.error);
      return;
    }

    await this.loadTodos();
  }

  test() {
  console.log('CLICK OK');
}
}
