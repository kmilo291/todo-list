import { Injectable } from '@angular/core';
import { CategoryRepository } from 'src/app/core/ports/category.repository';
import { Category } from 'src/app/core/models/shared/category.model';
import { BaseLocalStorageRepository } from './base-localstorage.repository';

@Injectable()
export class LocalStorageCategoryRepository
  extends BaseLocalStorageRepository<Category>
  implements CategoryRepository {

  constructor() {
    super('categories');
  }

}
