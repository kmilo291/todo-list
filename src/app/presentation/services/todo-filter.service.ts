import { Injectable } from '@angular/core';
import { TodoWithCategory } from 'src/app/core/models/projections/todo-with-category.model';

export type TodoFilter = 'all' | 'completed' | 'pending';

export interface TodoFilterCriteria {
  todos: TodoWithCategory[];
  search?: string;
  status?: TodoFilter;
  categoryId?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class TodoFilterService {

apply(criteria: TodoFilterCriteria): TodoWithCategory[] {

  console.log(criteria)

  let result = [...criteria.todos];

  if (criteria.search) {

    const term = criteria.search.toLowerCase();

    result = result.filter(todo => {

      const matchesTitle =
        todo.title.toLowerCase().includes(term);

      const matchesCategory =
        todo.category?.name?.toLowerCase().includes(term) ?? false;

      return matchesTitle || matchesCategory;
    });
  }

  if (criteria.status && criteria.status !== 'all') {

    result = result.filter(todo =>
      criteria.status === 'completed'
        ? todo.completed
        : !todo.completed
    );
  }

  if (criteria.categoryId) {

    result = result.filter(todo =>
      todo.categoryId === criteria.categoryId
    );
  }

  return result;
}
}
