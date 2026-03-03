import { CreateTodo } from './create-todo.use-case';
import { TodoRepository } from '../ports/todo.repository';
import { CategoryRepository } from '../ports/category.repository';
import { CreateTodoDto } from '../models/dtos/create-todo.dto';

describe('CreateTodo UseCase', () => {

  let useCase: CreateTodo;
  let mockTodoRepository: jasmine.SpyObj<TodoRepository>;
  let mockCategoryRepository: jasmine.SpyObj<CategoryRepository>;

  beforeEach(() => {

    mockTodoRepository = jasmine.createSpyObj('TodoRepository', ['save']);
    mockCategoryRepository = jasmine.createSpyObj('CategoryRepository', ['save']);

    useCase = new CreateTodo(mockTodoRepository, mockCategoryRepository);
  });

  it('should return error if title is empty', async () => {

    const dto: CreateTodoDto = {
      title: '',
      categoryId: 1
    };

    const result = await useCase.execute(dto);

    expect(result.success).toBeFalse();
    expect(result.error).toBe('El título no puede estar vacío');
    expect(mockTodoRepository.save).not.toHaveBeenCalled();
  });

  it('should save todo when title is valid', async () => {

    const dto: CreateTodoDto = {
      title: 'Aprender arquitectura',
      categoryId: 1
    };

    mockTodoRepository.save.and.resolveTo();

    const result = await useCase.execute(dto);

    expect(result.success).toBeTrue();
    expect(mockTodoRepository.save).toHaveBeenCalled();
  });

});
