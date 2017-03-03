import { Injectable, EventEmitter } from '@angular/core';
import { Point } from './point';
import { POINTS } from './mock-points';
/*
import 'rxjs/add/operator/toPromise';
import Promise = Q.Promise;
*/

@Injectable()
export class PointService {
    clickMarker: EventEmitter<Point>;

    constructor(){
        this.clickMarker = new EventEmitter();
    }

    getPoints(): Promise<Point[]> {
        return Promise.resolve(POINTS);
    }

    getPointsSync(): Point[] {
        return POINTS;
    }
    getPoint(id): Point{
        var points = new Array();
        points =  POINTS;
        for( var i = 0; i < points.length;i++)
        {
            if(points[i].id == id)
                return points[i];
        }
    }
}
