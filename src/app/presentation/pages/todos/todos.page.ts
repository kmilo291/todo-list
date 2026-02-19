import { GetTodosWithCategory } from "src/app/core/use-cases/get-todos-with-category.use-case";

export class TodosPage {

  todos: any[] = [];

  constructor(private useCase: GetTodosWithCategory) {}

  async ionViewWillEnter() {
    this.todos = await this.useCase.execute();
  }
}
