import { Category } from "../shared/category.model";
import { Todo } from "../shared/todo.model";

export interface TodoWithCategory extends Todo {
  category?: Category;
}
