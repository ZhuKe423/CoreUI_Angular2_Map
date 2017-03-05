import { Component,Input } from '@angular/core';
import { Point } from './point';

@Component({
    selector: 'point-details',
    template:`
        <div *ngIf="point">
            <h2>point details:</h2>
            <div><h3>place:{{point.name}}, state:{{point.state}}, new_info: {{point.new_info}}</h3>
            </div>
        </div>
    `
})

export class PointDetails {
    @Input()
    point : Point;
}