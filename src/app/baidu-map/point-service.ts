import { Injectable, EventEmitter} from '@angular/core';
import { Http, Jsonp, Headers, URLSearchParams } from '@angular/http';
import { Point } from './point';
import { POINTS } from './mock-points';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PointService {
    private headers = new Headers({'Just_Test': 'application/json'});
    private checkpointsUrl = 'http://api.jzk12.com/index/inspection/api';  // URL to web api
    constructor(
        private  http: Http,
        private jsonp: Jsonp) { }



    getPoints(): Promise<Point[]> {
        let params = new URLSearchParams();
        params.set('action', 'checkpoints');
        return this.http.get(this.checkpointsUrl, {search: params/*, header: this.headers*/})
            .toPromise()
            .then(response => response.json() as Point[])
            .catch(this.handleError);
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

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
