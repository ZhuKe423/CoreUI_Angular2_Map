import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BaiduMap, OfflineOptions, ControlAnchor, NavigationControlType} from 'angular2-baidu-map';
import { PointService } from './point-service';
import { Point } from './point';
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: 'app-baidu-map',
  templateUrl: './baidu-map.component.html',
  styles: [`
        baidu-map{
            width: 100%;
            height: 500px;
            display: block;
        }
    `],
})

export class BaiduMapComponent implements OnInit {

  constructor(
      private pointService: PointService,
      private ref: ChangeDetectorRef,
      private router: Router
  ) {

  }

  opts:any;
  offlineOpts:OfflineOptions;
  points:Point[];
  selectedPoint: Point;

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

    console.log('Makers: ', this.opts.markers);

    this.offlineOpts = {
      retryInterval: 5000,
      txt: '没有网络'
    };

    /*this.selectedPoint = this.pointService.getPoint(1);*/

  }

  // 刚加载加载地图信息
  loadMap(e:any) {
    console.log(e);
  }

  // 单机地图坐标, 打印信息
  clickMarker(marker: any){
    for (var i = 0 ; i < this.points.length;i++)
    {
      if((this.points[i].latitude  == marker.point.lat) && (this.points[i].longitude  == marker.point.lng))
      {
        this.selectedPoint = this.points[i];
        this.pointService.clickMarker.emit(this.selectedPoint);
        break;
      }
    }
    this.ref.markForCheck();
    this.ref.detectChanges();

    console.log('The clicked marker is', this.selectedPoint);

  }

  /*// 单机地图坐标, 打印信息
  clickMarker(marker: any) {
    console.log('Clicked marker\'s title is: ', marker.title);
    this.selectedPoint = this.points[1];
  }*/

  getMarks(){
    //this.pointService.getPoints().then(points => this.points = points);
    this.points = this.pointService.getPointsSync();
    var marks = new Array();
    for ( var i = 0; i < this.points.length;i++)
    {
      var tmp_mark = {
        longitude : this.points[i].longitude ,
        latitude : this.points[i].latitude ,
        title : this.points[i].name,
        content: this.points[i].state,
        /*autoDisplayInfoWindow : false,
        enableMessage : false,*/
      };
      marks[i] = tmp_mark;
    }

    return marks;
  }

}


