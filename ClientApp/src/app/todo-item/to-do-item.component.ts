import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoItem } from '../models/ToDoItem';
import { ToDoService } from '../services/to-do.service';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {

  item: ToDoItem;
  form: FormGroup;

  constructor(
    private toDoService: ToDoService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder) 
    
    {
    this.item = {
      id: 'new',
      description: '',
      amount: 0,
      createTime: new Date().toISOString(),
      type: ''
    };
    this.form = this.fb.group({
      description: this.fb.control('', [Validators.required]),
      done: this.fb.control(''),
      favorite: this.fb.control('')
    });
    this.form.valueChanges.subscribe(() => {
      this.item.description = this.form.get('description')?.value ?? '';
    //   this.item.done = this.form.get('done')?.value ?? false;
    });
  }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('itemId');
    if (id && id !== 'new') {
      this.loadData(id);
    } else {
      this.patchFormWithItem(this.item);
    }
  }

  async navToList(): Promise<boolean> {
    return this.router.navigate(['items'], {
      relativeTo: this.route.parent
    });
  }

  async canDeactivate(): Promise<boolean> {
    if (this.form.dirty) {
      const ok = confirm(`Discard changes and leave?`);
      if (ok) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  toggleItemFavorite(fav: boolean): void {
    this.form.get('favorite')?.setValue(fav);
  }

  save(): void {
    this.toDoService.createOne(this.item).subscribe(
    (item) => {
        this.item.id = item.id;
        this.item.createTime = item.createTime;
        this.form.markAsPristine();
        this.navToList();
    },() => {
        console.error('Failed to create item');
    })}

//   save(): void {
//     if (!this.isNewItem()) {
//       this.toDoService.updateOne(this.item.id, this.item).subscribe(() => {
//         this.form.markAsPristine();
//         this.navToList();
//       }, () => {
//         console.error('Failed to update item');
//       });
//     } else {
//       this.toDoService.createOne(this.item).subscribe();
//       this.form.markAsPristine();
//       this.navToList();
//       };  
//     }
  
  delete(): void {
    const ok = confirm(`Delete this item?`);
    if (ok) {
      if (!this.isNewItem()) {
        this.toDoService.deleteOne(this.item.id).subscribe(() => {
          this.navToList();
        });
      } else {
        this.navToList();
      }
    }
  }

  isNewItem(): boolean {
    return this.item.id === 'new';
  }

  private loadData(id: string): void {
    this.toDoService.getOne(id).subscribe({
      next: item => {
        this.item = item;
        this.patchFormWithItem(this.item);
      },
      error: () => {
        this.navToList();
        console.error('Failed to load item');
      }
    });
  }

  private patchFormWithItem(item: ToDoItem): void {
    this.form.patchValue({
      description: item.description,
    //   done: item.done
    });
  }
}