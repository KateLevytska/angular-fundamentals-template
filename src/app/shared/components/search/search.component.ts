import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild("searchForm") public searchForm!: NgForm;
  @Input() placeholder: string = 'Input text';
  @Output() searchValue = new EventEmitter<{search: string}>();

  onSubmit(event: {search: string}): void {
     this.searchValue.emit(event)
  }
}
