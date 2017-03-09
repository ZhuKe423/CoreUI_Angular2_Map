import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from "@angular/http";
import { CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BaiduMapModule} from '../baidu-map/baidu-map.module';
import { MapChartOne} from '../baidu-map/MapChartOne.component';
import { PointService} from '../baidu-map/point-service'
import {NgbModal,NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    DropdownModule,
    BaiduMapModule,
    HttpModule,
    JsonpModule,
    //BrowserModule,
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [ DashboardComponent ],
  providers: [
    PointService,
    NgbModal,
  ],

})
export class DashboardModule { }
