import { Component,Input } from '@angular/core';
import { Point } from './point';

@Component({
    selector: 'point-details',
    template:`
        <div *ngIf="point">
            <p></p><p>place:{{point.name}}, state:{{point.state}}, new_info: {{point.new_info}}</p>
        </div>
    `
})

export class PointDetails {
    @Input()
    point : Point;
}