import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PointService } from './point-service';
import { Point } from './point';

@Component({
    selector: 'point-details',
    template:`
        <div>
            <h2>point details:</h2>
            <h3>place:{{point.name}}, state:{{point.state}}, new_info: {{point.new_info}}</h3>
        </div>
    `
})

export class PointDetailsComponent {
    point : Point;
    constructor(
        private pointService: PointService,
        private route: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        this.point = this.pointService.getPoint(1);
    }

}