import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReservasPage } from './reservas.page';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ReservasPage
            }
        ])
    ],
    declarations: [ReservasPage]


})
export class ReservasPageModule {}
