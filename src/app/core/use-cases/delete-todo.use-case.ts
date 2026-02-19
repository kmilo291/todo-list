import { Injectable } from "@angular/core";
import { Result } from "../models/shared/result.model";
import { TodoRepository } from "../ports/todo.repository";
import { DeleteTodoDto } from "../models/dtos/delete-todo.dto";


@Injectable({ providedIn: 'root' })
export class DeleteTodo {

  constructor(private repo: TodoRepository) {}

  async execute(data: DeleteTodoDto): Promise<Result<void>> {

      try {

        await this.repo.delete(data.id);
        return { success: true };

      } catch (error) {
        return {
          success: false,
          error: 'No se pudo eliminar el Todo'
        };
      }
    }


  }



