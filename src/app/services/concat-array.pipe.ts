import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'concatArray'})
export class ConcatArrayPipe implements PipeTransform {
    
    transform(value: String[], maxNb: number) {
        maxNb = Math.min((maxNb == null ? 3 : maxNb), value.length);
        return value.slice(0,maxNb).join(', ') + (maxNb < value.length ? '...' : '');
    }

}