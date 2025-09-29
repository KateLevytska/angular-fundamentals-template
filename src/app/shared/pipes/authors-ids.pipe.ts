import { Pipe, PipeTransform } from '@angular/core';
import { mockedAuthorsList } from '../mocks/mocks';

@Pipe({
  name: 'authors'
})
export class AuthorsPipe implements PipeTransform {
  transform(authorIds: string[]): string {
    return authorIds
      .map(id => mockedAuthorsList.find(author => author.id === id)?.name)
      .filter(name => !!name)
      .join(', ');
  }
}