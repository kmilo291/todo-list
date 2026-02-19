import { Category } from "../entities/category.model";
import { Todo } from "../entities/todo.model";

export interface TodoWithCategory extends Todo {
  category?: Category;
}
