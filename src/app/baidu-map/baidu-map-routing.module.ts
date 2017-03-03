import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaiduMapComponent } from './baidu-map.component';
import { PointDetailsComponent } from './point-details.component';

const routes: Routes = [
    {
        path: '',
        component: BaiduMapComponent,
        data: {
            title: 'MapCharts'
        }
    },
    {path: 'detail/:id', component: PointDetailsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BaiduMapRoutingModule {}