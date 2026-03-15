import { Injectable } from '@angular/core';
import { Todo } from 'src/app/core/models/shared/todo.model';
import { TodoRepository } from 'src/app/core/ports/todo.repository';
import { BaseLocalStorageRepository } from './base-localstorage.repository';

@Injectable()
export class LocalStorageTodoRepository
  extends BaseLocalStorageRepository<Todo>
  implements TodoRepository {

  constructor() {
    super('todos');
  }

}
