import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Todo } from './models/Todo';
import { ConfirmationService } from './services/confirmation.service';
import { Confirm } from './services/confirm.decorator';
import { ConfirmComponent } from './components/confirm/confirm.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, ConfirmComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLight = false;
  inputValue = '';
  todos$: Observable<Todo[]>;
  activeEditId = '';
  editValue = '';
  selectedCategory = '';
  searchValue = '';

  constructor(
    private themeService: ThemeService,
    private todoService: TodoService,
    private confiramtionService: ConfirmationService
  ) {
    this.todos$ = this.todoService.getTodos();
  }

  trackByFn(index: number, todo: Todo): string {
    return todo.id;
  }

  toggleTheme(e: Event) {
    this.isLight = (e.target as HTMLInputElement).checked;
    this.themeService.setTheme(this.isLight ? 'light' : 'dark');
  }

  addTodo() {
    this.todoService.createTodo(this.inputValue);
    this.inputValue = '';
  }

  @Confirm('Are you sure you want to delete this todo item?')
  async deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }

  updateTodo(id: string, isComplete: boolean, content: string) {
    this.todoService.updateTodo(id, content, isComplete);
  }

  setEditId(todo: Todo) {
    this.activeEditId = todo.id;
    this.editValue = todo.content;
  }

  saveEdit() {
    this.todoService.updateTodo(this.activeEditId, this.editValue);
    this.activeEditId = '';
  }

  changeFilter(filter: 'todo' | 'complete' | 'all') {
    if (this.selectedCategory !== filter) {
      this.selectedCategory = filter;
      this.todoService.setFilter(filter);
    }
  }

  setSearch(e: Event) {
    this.searchValue = (e.target as HTMLInputElement).value;
    this.todoService.setSearch(this.searchValue);
  }
}
