import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // TODO: Use dollar sign for subjcets and observables
  private todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private filter: BehaviorSubject<'todo' | 'complete' | 'all'> =
    new BehaviorSubject<'todo' | 'complete' | 'all'>('all');
  private search: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  getTodos(): Observable<Todo[]> {
    // TODO: restructure code to be cleaner
    return combineLatest([this.todos, this.filter, this.search]).pipe(
      map(([todos, filter, search]) => {
        switch (filter) {
          case 'all':
            return todos.filter((todo) =>
              search
                ? todo.content.search(search) === -1
                  ? false
                  : true
                : true
            );
          case 'complete':
            return todos
              .filter((todo) => todo.isComplete)
              .filter((todo) =>
                search
                  ? todo.content.search(search) === -1
                    ? false
                    : true
                  : true
              );
          case 'todo':
            return todos
              .filter((todo) => !todo.isComplete)
              .filter((todo) =>
                search
                  ? todo.content.search(search) === -1
                    ? false
                    : true
                  : true
              );
        }
      })
    );
  }

  setSearch(searchValue: string) {
    this.search.next(searchValue);
  }

  // TODO: use types
  setFilter(category: 'todo' | 'complete' | 'all') {
    this.filter.next(category);
  }

  createTodo(content: string): void {
    // TODO: deep clone objects within the array
    const todosCopy = [...this.todos.getValue()];

    todosCopy.push({
      content,
      isComplete: false,
      id: uuidv4(),
    });

    this.todos.next(todosCopy);
  }

  deleteTodo(id: string): void {
    const todosCopy = [...this.todos.getValue()];
    const todoIndex = todosCopy.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) this.todos.error(`Could not find todo with id ${id}`);

    todosCopy.splice(todoIndex, 1);

    this.todos.next(todosCopy);
  }

  updateTodo(id: string, content: string, isComplete?: boolean): void {
    const todosCopy = [...this.todos.getValue()];
    const todoIndex = todosCopy.findIndex((todo) => todo.id === id);

    // if (todoIndex === -1) this.todos.error(`Could not find todo with id ${id}`);
    if (todoIndex === -1) return console.error('Could not find todo item');

    todosCopy[todoIndex] = {
      id,
      isComplete: isComplete ? isComplete : todosCopy[todoIndex].isComplete,
      content,
    };

    this.todos.next(todosCopy);
  }
}
