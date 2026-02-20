import { Todo } from '../models/shared/todo.model';

export abstract class TodoRepository {
  abstract getAll(): Promise<Todo[]>;
  abstract save(todo: Todo): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract update(todo: Todo): Promise<void>;

}
