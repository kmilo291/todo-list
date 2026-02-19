
import { CategoryRepository } from '../ports/category.repository';
import { TodoRepository } from '../ports/todo.repository.ts';

export class GetTodosWithCategory {

  constructor(
    private todoRepo: TodoRepository,
    private categoryRepo: CategoryRepository
  ) {}

  async execute() {
    const todos = await this.todoRepo.getAll();
    const categories = await this.categoryRepo.getAll();

    return todos.map(todo => ({
      ...todo,
      category: categories.find(c => c.id === todo.categoryId)
    }));
  }
}
