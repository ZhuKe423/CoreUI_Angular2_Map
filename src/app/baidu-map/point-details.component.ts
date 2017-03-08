import { Component,Input } from '@angular/core';
import { Point } from './point';

@Component({
    selector: 'point-details',
    template:`
        <div *ngIf="point">
            <p><strong>需要确认的新信息：</strong> place:{{point.name}}, state:{{point.state}}, new_info: {{point.new_info}}</p>
        </div>
    `
})
export class PointDetails {
    @Input()
    point : Point;
}

@Component({
    selector: 'select-point-details',
    template:`
        <div *ngIf="point">
            <p><strong>选中信息：</strong> place:{{point.name}}, state:{{point.state}}, new_info: {{point.new_info}} <button type="button" class="btn btn-success btn-sm"  (click)="onClick()">确认</button></p>
        </div>
    `
})
export class SelectPointDetails {
    @Input()
    point : Point;

    onClick(){
        console.log("SelectPointDetails_onClick");
    }
}