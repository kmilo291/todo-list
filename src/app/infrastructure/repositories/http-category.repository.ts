import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { firstValueFrom, map, takeUntil } from 'rxjs';

import { CategoryRepository } from 'src/app/core/ports/category.repository';
import { Category } from 'src/app/core/models/shared/category.model';
import { STRAPI_HEADERS, STRAPI_URL } from '../config/strapi.config';
import { TodoEventsService } from 'src/app/presentation/services/todo-events.service';

@Injectable()
export class HttpCategoryRepository implements CategoryRepository {

  private url = STRAPI_URL + '/api/categories';

  private cache: (Category & { documentId: string })[] = [];

  constructor(
    private events: TodoEventsService
  ) {}

  async getAll(): Promise<Category[]> {

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
        name: item.name,
        color: item.color,
        documentId: item.documentId
      }));

      return this.cache.map(c => ({
        id: c.id,
        name: c.name,
        color: c.color
      }));

    } catch {
        console.log('Request cancelled for categories');
      return [];
    }
  }

  async save(category: Category): Promise<void> {

    await firstValueFrom(
      ajax({
        url: this.url,
        method: 'POST',
        headers: STRAPI_HEADERS,
        body: {
          data: {
            category_id: String(category.id),
            name: category.name,
            color: category.color
          }
        }
      }).pipe(
        takeUntil(this.events.cancelRequests$)
      )
    );
  }

  async delete(id: number): Promise<void> {

    const category = this.cache.find(c => c.id === id);

    if (!category) throw new Error('Not found');

    await firstValueFrom(
      ajax({
        url: `${this.url}/${category.documentId}`,
        method: 'DELETE',
        headers: STRAPI_HEADERS
      }).pipe(
        takeUntil(this.events.cancelRequests$)
      )
    );
  }

  async update(category: Category): Promise<void> {

    const existing = this.cache.find(c => c.id === category.id);

    if (!existing) throw new Error('Not found');

    await firstValueFrom(
      ajax({
        url: `${this.url}/${existing.documentId}`,
        method: 'PUT',
        headers: STRAPI_HEADERS,
        body: {
          data: {
            name: category.name,
            color: category.color
          }
        }
      }).pipe(
        takeUntil(this.events.cancelRequests$)
      )
    );
  }
}
