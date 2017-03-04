import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaiduMapComponent } from './baidu-map.component';

const routes: Routes = [
    {
        path: '',
        component: BaiduMapComponent,
        data: {
            title: 'MapCharts'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BaiduMapRoutingModule {}