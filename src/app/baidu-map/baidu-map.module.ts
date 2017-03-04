import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { BaiduMap } from 'angular2-baidu-map';


import { BaiduMapComponent } from './baidu-map.component';
import { BaiduMapRoutingModule } from './baidu-map-routing.module';
import { PointDetails } from './point-details.component';
import { PointService } from './point-service';

@NgModule({
    imports: [
        BaiduMapRoutingModule,
        ChartsModule,
        DropdownModule,
        FormsModule,
        CommonModule,

    ],
    declarations: [
        BaiduMapComponent,
        BaiduMap,
        PointDetails,
    ],
    providers: [
        PointService,
    ],
})
export class BaiduMapModule { }