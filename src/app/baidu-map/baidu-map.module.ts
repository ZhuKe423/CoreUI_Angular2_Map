import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { HttpModule, JsonpModule }    from '@angular/http';

import { BaiduMap } from './baidu-map.component';
import { BaiduMapRoutingModule } from './baidu-map-routing.module';
import { MapChartOne } from './MapChartOne.component';
import { PointDetails , SelectPointDetails } from './point-details.component';
import { PointService } from './point-service';

@NgModule({
    imports: [
        BaiduMapRoutingModule,
        ChartsModule,
        DropdownModule,
        FormsModule,
        CommonModule,
        HttpModule,
        JsonpModule,
        //BrowserModule
    ],
    declarations: [
        BaiduMap,
        MapChartOne,
        PointDetails,
        SelectPointDetails
    ],
    exports: [
      MapChartOne,
      PointDetails,
      SelectPointDetails
    ],
    providers: [
        PointService,
    ],
})
export class BaiduMapModule { }