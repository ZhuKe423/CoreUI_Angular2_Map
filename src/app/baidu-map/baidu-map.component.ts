import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {BaiduMap, OfflineOptions, ControlAnchor, NavigationControlType} from 'angular2-baidu-map';
import { PointService} from './point-service';
import { Point } from './point';
import { PointDetails } from './point-details.component';
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
      private router: Router,
      private ref:ChangeDetectorRef,
  ) {}

  opts:any;
  offlineOpts:OfflineOptions;
  points:Point[];
  selectedPoint: Point;
  private timer;

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

    this.offlineOpts = {
      retryInterval: 5000,
      txt: '没有网络'
    };
  }

  // 刚加载加载地图信息
  loadMap(e:any) {
    console.log(e);
  }

  // 单机地图坐标, 打印信息
  clickMarker(marker:any) {
    //console.log(marker.point);
    //this.selectedPoint = this.points[1];
    //this.points[0].new_info = !this.points[0].new_info;
    var current_marks = this.getMarks();
    this.opts.markers = current_marks;

    for (var i = 0 ; i < this.points.length;i++)
    {
        if(this.points[i].latitude  == marker.point.lat)
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
     this.timer = setInterval(() => {
       this.points[0].new_info = !this.points[0].new_info;
       console.log('clock:',this.opts);
       this.ref.markForCheck();
       this.ref.detectChanges();
     },10000);
  }
  getMarks(){
    //this.pointService.getPoints().then(points => this.points = points);
    this.points = this.pointService.getPointsSync();
    this.selectedPoint = this.points[1];
    var marks = new Array();
    for ( var i = 0; i < this.points.length;i++)
    {
      var iconUrl:string;
      var iconWidth :number;
      var iconHeigh :number;
      if (this.points[i].new_info == true) {
        iconUrl = 'http://api.map.baidu.com/img/markers.png';
        iconWidth = 23;
        iconHeigh = 25;
      }
      else {
        iconUrl = 'http://api.map.baidu.com/img/markers.png';
        iconWidth = 10;
        iconHeigh = 23;
      }
      var tmp_mark = {
        longitude : this.points[i].longitude ,
        latitude : this.points[i].latitude ,
        title : this.points[i].name,
        content: this.points[i].state,
        autoDisplayInfoWindow : false,
        enableMessage : false,
        icon : iconUrl,
        width : iconWidth,
        height : iconHeigh,
      };
      marks[i] = tmp_mark;
    }

    return marks;
  }

}
