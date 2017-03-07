import { Injectable, EventEmitter} from '@angular/core';
import { Point } from './point';
import { POINTS } from './mock-points';

@Injectable()
export class PointService {
    getPoints(): Promise<Point[]> {
        return Promise.resolve(POINTS);
    }

    getPointsSync(): Point[] {
        //POINTS[0].new_info = !POINTS[0].new_info;
        //POINTS[1].new_info = !POINTS[1].new_info;
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
