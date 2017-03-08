import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import {  OfflineOptions,MapOptions } from './interfaces/Options';
import { Point } from './point';
import { InspectionRecord } from './inspectionRecord';
import { ControlAnchor } from './enum/ControlAnchor';
import {NavigationControlType} from './enum/NavigationControlType';
import { PointService} from './point-service';
import { ChangeDetectorRef } from "@angular/core";


@Component({
    selector: 'mapchart-one',
    template: `
        <baidu-map
            ak="RpbzSVUc0TKuqrfyNmk0oQoQOy7f4jGI"
            [options]="opts"
            [offline]="offlineOpts"
            (onMapLoaded)="loadMap($event)"
            (onMarkerClicked)="clickMarker($event)"
        ></baidu-map>          
    `,
    styles: [`
        baidu-map{
            width: 100%;
            height: 500px;
            display: block;
        }
    `],
})

export class MapChartOne implements OnInit {
    @Output() onMarkerClicked = new EventEmitter();
    @Output() pointStatusUpdate = new EventEmitter();
    @Output() rawRecordArive = new EventEmitter();

    opts:MapOptions;
    offlineOpts:OfflineOptions;
    points:Point[];
    rawInspectionRecords: InspectionRecord[];
    selectedPoint: Point;
    pointHasNewInfor: Point;
    map:any;

    private timer;
    constructor(
        private pointService: PointService,
        private router: Router,
        private ref:ChangeDetectorRef,
    ) {}
    ngOnInit() {
        var current_marks = this.getMarks();

        // 配置地图, 参考百度地图api
        this.opts = {
        // 地图中心坐标
        center: {
            longitude:104.072276,
            latitude: 30.663499
        },
        zoom: 13,
        enableMapClick : false,
        // 地图上的坐标
        markers: current_marks,
        geolocationCtrl: {
            anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT,
            showAddressBar:false,
            enableAutoLocation:false
        },
        scaleCtrl: {
            anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
        },
        overviewCtrl: {
            isOpen: false
        },
        navCtrl: {
            type: NavigationControlType.BMAP_NAVIGATION_CONTROL_SMALL ,
            showZoomInfo:false,
            enableGeolocation:false,
        }
        };

        this.offlineOpts = {
        retryInterval: 5000,
        txt: '没有网络'
        };
    }

    // 刚加载加载地图信息
    loadMap(e:any) {
        this.map = e;
        console.log(e);
    }

    // 单机地图坐标, 打印信息
    clickMarker(marker:any) {
        //console.log(marker.point);
        //this.selectedPoint = this.points[1];
        //this.points[0].new_info = !this.points[0].new_info;
        //let current_marks = this.getMarks();
        //this.opts.markers = current_marks;

        for (var i = 0 ; i < this.points.length;i++)
        {
            if ((this.points[i].latitude  == marker.point.lat)&&(this.points[i].longitude  == marker.point.lng))
            {
                this.selectedPoint = this.points[i];
                break;
            }
        }
        this.onMarkerClicked.emit(this.selectedPoint);

        this.ref.markForCheck();
        this.ref.detectChanges();
    }

    ngAfterViewInit()
    {
        var tmpcount = 0;
        this.timer = setInterval(() => {
            this.pointService.getInspectionRecord(0)
                .then(rawInspectionRecord => {this.rawInspectionRecords = rawInspectionRecord});
            this.rawRecordArive.emit(this.rawInspectionRecords); //Emit event

            let current_marks = this.getMarks();
            this.opts.markers = current_marks;

            ++tmpcount;
            if (tmpcount >= this.points.length){
                tmpcount = 0;
            }
            if (this.points[tmpcount].new_info){
                this.pointHasNewInfor = this.points[tmpcount];
                this.pointStatusUpdate.emit(this.pointHasNewInfor); //Emit event
                this.ref.markForCheck();
                this.ref.detectChanges();
                console.log('tmpcount: ',tmpcount);
                console.log('clock: ',this.pointHasNewInfor);
                //this.map._redrawMarkers();
            }
        }, 30000);
    }

    getMarks(){
        let marks = new Array();
        //this.points = this.pointService.getPointsSync();

        this.pointService.getPoints().then(points => {
            this.points = points;
            for ( let i = 0; i < this.points.length;i++) { // Shall be put in here, as this.points can be only get after then call.
                let iconUrl:string = 'http://api.map.baidu.com/img/markers.png';
                let iconWidth :number = 23;
                let iconHeigh :number = 25;
                let offset_x :number = 0;
                let offset_y :number = 0 - 11*25;
                if (this.points[i].new_info == false) {
                    offset_x = 0;
                    offset_y = 0- 10*25;
                }

                let tmp_mark = {
                    longitude : this.points[i].longitude ,
                    latitude : this.points[i].latitude ,
                    title : this.points[i].name,
                    content: '<div><div>'+this.points[i].state+'</div><div><button type="button" class="btn btn-success btn-sm" ng-click="marker_confirm('+i+')">确定</button></div></div>',
                    autoDisplayInfoWindow : false,
                    enableMessage : false,
                    icon : iconUrl,
                    width : iconWidth,
                    height : iconHeigh,
                    offset_x: offset_x,
                    offset_y: offset_y,
                };
                marks[i] = tmp_mark;
            }
            console.log('Promised value is: ', this.points);
        });

        return marks;
    }
    marker_confirm(index:number){
        alert("this.point "+index+" confirmed!");
    }
}