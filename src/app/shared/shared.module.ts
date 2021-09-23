import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAlertModule } from 'ng-zorro-antd/alert';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NzAvatarModule,
    NzDropDownModule,
    NzIconModule,
    NzGridModule,
    NzTagModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzAlertModule,
    NzNotificationModule,
    NzModalModule,
    NzMessageModule
  ]
})
export class SharedModule { }
