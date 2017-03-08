import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapChartOne} from "./MapChartOne.component";

const routes: Routes = [
    {
        path: '',
        component: MapChartOne,
        data: {
            title: '地图信息'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BaiduMapRoutingModule {}