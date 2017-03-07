import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {  OfflineOptions,MapOptions } from './interfaces/Options';
import { Point } from './point';
import { ControlAnchor } from './enum/ControlAnchor';
import {NavigationControlType} from './enum/NavigationControlType';
import { PointService} from './point-service';
import { ChangeDetectorRef } from "@angular/core";

@Component({
    selector: 'mapchart-one',
    template: `
        <div><p>新消息：</p><point-details [point]="pointHasNewInfor"></point-details></div>
        <div><p>选中标签的信息：</p><point-details [point]="selectedPoint"></point-details></div>
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
    opts:MapOptions;
    offlineOpts:OfflineOptions;
    points:Point[];
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

        this.ref.markForCheck();
        this.ref.detectChanges();
        console.log('baidu-map:',this.opts);
    }

    ngAfterViewInit()
    {
        var tmpcount = 0;
        this.timer = setInterval(() => {
            let current_marks = this.getMarks();
            this.opts.markers = current_marks;

            ++tmpcount;
            if (tmpcount >= this.points.length){
                tmpcount = 0;
            }
            if (this.points[tmpcount].new_info){
                this.pointHasNewInfor = this.points[tmpcount];
            }
            console.log('clock:',this.pointHasNewInfor);
            this.ref.markForCheck();
            this.ref.detectChanges();
            this.map._redrawMarkers();
        },30000);
    }

    getMarks(){
        //this.pointService.getPoints().then(points => this.points = points);
        this.points = this.pointService.getPointsSync();
        var marks = new Array();
        for ( var i = 0; i < this.points.length;i++)
        {
            var iconUrl:string = 'http://api.map.baidu.com/img/markers.png';
            var iconWidth :number = 23;
            var iconHeigh :number = 25;
            var offset_x :number = 0;
            var offset_y :number = 0 - 11*25;
            if (this.points[i].new_info == false) {
                offset_x = 0;
                offset_y = 0- 10*25;
            }

            var tmp_mark = {
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
        return marks;
    }
    marker_confirm(index:number){
        alert("this.point "+index+" confirmed!");
    }
}