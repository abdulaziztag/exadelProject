import { Pipe, PipeTransform } from '@angular/core'
@Pipe({ name: 'DateFromNumberPipe' })
export class DateFromNumberPipe implements PipeTransform {
  transform(value: number): string {
    return `${new Date(value)}`
  }
}
