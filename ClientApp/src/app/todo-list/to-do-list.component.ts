import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { ToDoItem } from '../models/ToDoItem';
import { ToDoService } from '../services/to-do.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {
  // public searchString: string = '';
  // public hideDone: boolean = false;
  // public sortByDescDir?: SortDir;
  // public sortByDateDir?: SortDir = SortDir.Asc;
  // public SortDir = SortDir;
  item: ToDoItem;
  form: FormGroup;
  
  public displayList: Array<ToDoItem> = new Array<ToDoItem>;
  private fullList: ToDoItem[] = [];

  private _sub: Subscription = new Subscription();

  constructor(
    private todoService: ToDoService, 
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder) 
    {
      this.item = {
        id: 'new',
        description: '',
        amount: 0,
        createTime: new Date().toISOString(),
        type: ''
      }
      this.form = this.fb.group({
        description: this.fb.control('', [Validators.required]),
        done: this.fb.control(''),
        favorite: this.fb.control('')
      });
    }

  ngOnInit(): void {
    this._sub = this.todoService.getAll().subscribe((response:ToDoItem[]) => {
      this.displayList = response;
      this.fullList = [...this.displayList];
    });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  delete(): void {
    const ok = confirm(`Delete this item?`);
    this.todoService.deleteOne(this.item.id).subscribe();
  }

  // reload(): void {
  //   this.searchString = "";
  //   this.todoService.getAll().subscribe((response:ToDoItem[]) => this.displayList = response);
  //   // this.loadData();
  // }

  // onSearchTextChange(text: string): void {
  //   this.searchString = text;
  //   this.displayList = this.searchString ? this.fullList.filter(i => i.description.toLowerCase().includes(this.searchString.toLowerCase())) : this.fullList.slice();
  // }

  // toggleSortByDesc(): void {
  //   switch (this.sortByDescDir) {
  //     case SortDir.Asc:
  //       this.sortByDescDir = SortDir.Desc;
  //       break;
  //     case SortDir.Desc:
  //       this.sortByDescDir = undefined;
  //       break;
  //     default:
  //       this.sortByDescDir = SortDir.Asc;
  //   }
  //   this.displayList = [...this.displayList.sort((i1, i2) => i1.description.localeCompare(i2.description) * (this.sortByDescDir === SortDir.Asc ? 1 : -1))];
  // }

  // toggleSortByDate(): void {
  //   switch (this.sortByDateDir) {
  //     case SortDir.Asc:
  //       this.sortByDateDir = SortDir.Desc;
  //       break;
  //     case SortDir.Desc:
  //       this.sortByDateDir = undefined;
  //       break;
  //     default:
  //       this.sortByDateDir = SortDir.Asc;
  //   }
  //   this.displayList = [... this.displayList.sort((i1, i2) => (new Date(i1.createTime).getTime() - new Date(i2.createTime).getTime()) * (this.sortByDateDir === SortDir.Asc ? 1 : -1))];
  //   console.log(this.displayList);
  // }

  // toggleHideDone(): void {
  //   this.hideDone = !this.hideDone;
  //   this.displayList = this.hideDone ? this.fullList.filter(i => !i.done) : this.fullList.slice();
  // }

  // toggleItemDone(item: ToDoItem): void {
  //   const oldValue = item.done;
  //   item.done = !item.done;
  //   this.todoService.updateOne(item.id, item).subscribe();
  // }

  async navToItem(item: ToDoItem): Promise<boolean> {
    return this.router.navigate(['item', item.id], {
      relativeTo: this.route.parent
    });
  }

  async navToCreateNew(): Promise<boolean> {
    return this.router.navigate(['item', 'new'], {
      relativeTo: this.route.parent
    });
  }

  // private loadData(): void{
  //   this.todoService.getAll().subscribe((response:ToDoItem[])=>this.displayList=response);
  //   this.fullList = [...this.displayList];
  // }
}

enum SortDir {
  Asc = 1,
  Desc = 2
}