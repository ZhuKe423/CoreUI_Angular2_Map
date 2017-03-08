import { Component,Input } from '@angular/core';
import { Point } from './point';

@Component({
    selector: 'point-details',
    template:`
        <div *ngIf="point">
            <p><strong>地点:</strong> {{point.name}}, <strong>巡检状态:</strong>{{point.state}}</p>
            <!--<p><strong>详细信息：</strong> place:{{point.name}}, state:{{point.state}}, new_info: {{point.new_info}}</p>-->
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
            <p><strong>巡检点编号:</strong>{{point.checkpoint_code}}</p><p><strong>地点:</strong> {{point.name}}, </p><p><strong>巡检状态:</strong>{{point.state}}</p>
        </div>
    `
})
export class SelectPointDetails {
    @Input()
    point : Point;
}