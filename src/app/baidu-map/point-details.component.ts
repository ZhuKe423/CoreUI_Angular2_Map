import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { PointService } from './point-service';
import { Point } from './point';
import { POINTS } from './mock-points';

@Component({
    selector: 'point-details',
    template:`
        <div *ngIf="point">
            <div>
                <h2>point details:</h2>
                <h3>place:{{point.name}}, state:{{point.state}}, new_info: {{point.new_info}}</h3>
            </div>
        </div>
    `
})

export class PointDetailsComponent {
    @Input()
    public  point : Point;

    constructor(
        private pointService: PointService,
        private route: ActivatedRoute,
    ) {
        this.point = POINTS[0];
        this.pointService.clickMarker.subscribe((value:Point) => {
            this.point = value;
            console.log("Current point is: ", this.point);
        })

    }
    /*ngOnInit(): void {
        this.pointService.clickMarker.subscribe((value:Point) => {
            this.point = value;
            console.log("Value is: ", value);
        })

    }*/

}