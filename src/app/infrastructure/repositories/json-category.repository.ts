import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryRepository } from 'src/app/core/ports/category.repository';
import { Category } from 'src/app/core/models/shared/category.model';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JsonCategoryRepository implements CategoryRepository {

  constructor(private http: HttpClient) {}

  async getAll(): Promise<Category[]> {
    return await firstValueFrom(
      this.http.get<Category[]>('assets/data/categories.json')
    );
  }

  async save(): Promise<void> {
    throw new Error('Solo lectura');
  }

  async delete(): Promise<void> {
    throw new Error('Solo lectura');
  }
}
