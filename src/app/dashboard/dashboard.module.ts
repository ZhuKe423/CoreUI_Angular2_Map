import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from "@angular/http";

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BaiduMapModule} from '../baidu-map/baidu-map.module';
import { MapChartOne} from '../baidu-map/MapChartOne.component';
import { PointService} from '../baidu-map/point-service'

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    DropdownModule,
    BaiduMapModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [ DashboardComponent ],
  providers: [
    PointService,
  ],

})
export class DashboardModule { }
