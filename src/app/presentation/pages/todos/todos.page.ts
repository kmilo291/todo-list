import { CreateTodo } from "src/app/core/use-cases/create-todo.use-case";
import { GetTodosWithCategory } from "src/app/core/use-cases/get-todos-with-category.use-case";

export class TodosPage {

  todos: any[] = [];

  constructor(private getTodos: GetTodosWithCategory, private createTodo: CreateTodo) {}

  async ionViewWillEnter() {
    this.todos = await this.getTodos.execute();
  }
}
