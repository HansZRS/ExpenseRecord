import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoItemComponent } from './todo-item/to-do-item.component';
import { ToDoListComponent } from './todo-list/to-do-list.component';

@NgModule({
  declarations: [
    ToDoListComponent,
    ToDoItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToDoRoutingModule,
    HttpClientModule
  ]
})
export class ToDoModule {
}
