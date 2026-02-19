import { CreateTodo } from './create-todo.use-case';
import { TodoRepository } from '../ports/todo.repository';
import { CreateTodoDto } from '../models/dtos/create-todo.dto';

describe('CreateTodo UseCase', () => {

  let useCase: CreateTodo;
  let mockRepository: jasmine.SpyObj<TodoRepository>;

  beforeEach(() => {

    mockRepository = jasmine.createSpyObj('TodoRepository', ['save']);

    useCase = new CreateTodo(mockRepository);
  });

  it('should return error if title is empty', async () => {

    const dto: CreateTodoDto = {
      title: '',
      categoryId: 1
    };

    const result = await useCase.execute(dto);

    expect(result.success).toBeFalse();
    expect(result.error).toBe('El título no puede estar vacío');
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should save todo when title is valid', async () => {

    const dto: CreateTodoDto = {
      title: 'Aprender arquitectura',
      categoryId: 1
    };

    mockRepository.save.and.resolveTo();

    const result = await useCase.execute(dto);

    expect(result.success).toBeTrue();
    expect(mockRepository.save).toHaveBeenCalled();
  });

});
