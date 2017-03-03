import { Injectable } from '@angular/core';
import { Point } from './point';
import { POINTS } from './mock-points';

@Injectable()
export class PointService {
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
