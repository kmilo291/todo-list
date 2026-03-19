import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { firstValueFrom, map, takeUntil } from 'rxjs';

import { TodoRepository } from 'src/app/core/ports/todo.repository';
import { Todo } from 'src/app/core/models/shared/todo.model';
import { STRAPI_HEADERS, STRAPI_URL } from '../config/strapi.config';
import { TodoEventsService } from 'src/app/presentation/services/todo-events.service';

@Injectable()
export class HttpTodoRepository implements TodoRepository {

  private url = STRAPI_URL + '/api/todos';

  private cache: (Todo & { documentId: string })[] = [];

  constructor(
    private events: TodoEventsService
  ) {}

  async getAll(): Promise<Todo[]> {

    try {

      const response: any = await firstValueFrom(
        ajax({
          url: this.url,
          method: 'GET',
          headers: STRAPI_HEADERS
        }).pipe(
          takeUntil(this.events.cancelRequests$),
          map(res => res.response)
        )
      );

      this.cache = response.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        completed: item.completed,
        categoryId: Number(item.category_id),
        documentId: item.documentId
      }));

      return this.cache.map(t => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
        categoryId: t.categoryId
      }));

    } catch {
      console.log('Request cancelled for todo');
      return [];
    }
  }

  async save(todo: Todo): Promise<void> {

    await firstValueFrom(
      ajax({
        url: this.url,
        method: 'POST',
        headers: STRAPI_HEADERS,
        body: {
          data: {
            todo_id: String(todo.id),
            title: todo.title,
            completed: todo.completed,
            category_id: String(todo.categoryId)
          }
        }
      }).pipe(
        takeUntil(this.events.cancelRequests$)
      )
    );
  }

  async delete(id: number): Promise<void> {

    const todo = this.cache.find(t => t.id === id);

    if (!todo) throw new Error('Not found');

    await firstValueFrom(
      ajax({
        url: `${this.url}/${todo.documentId}`,
        method: 'DELETE',
        headers: STRAPI_HEADERS
      }).pipe(
        takeUntil(this.events.cancelRequests$)
      )
    );
  }

  async update(todo: Todo): Promise<void> {

    const existing = this.cache.find(t => t.id === todo.id);

    if (!existing) throw new Error('Not found');

    await firstValueFrom(
      ajax({
        url: `${this.url}/${existing.documentId}`,
        method: 'PUT',
        headers: STRAPI_HEADERS,
        body: {
          data: {
            title: todo.title,
            completed: todo.completed,
            category_id: String(todo.categoryId)
          }
        }
      }).pipe(
        takeUntil(this.events.cancelRequests$)
      )
    );
  }
}
