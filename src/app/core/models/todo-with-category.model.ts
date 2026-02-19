import { Category } from "./category.model";
import { Todo } from "./todo.model";

export interface TodoWithCategory extends Todo {
  category?: Category;
}
