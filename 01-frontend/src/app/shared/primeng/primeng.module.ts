import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogModule } from 'primeng/dialog';
const modules: any = [
  BadgeModule,
  ButtonModule,
  BrowserModule,
  CommonModule,
  BrowserAnimationsModule,
  SidebarModule,
  InputTextModule,
  PaginatorModule,
  DropdownModule,
  CheckboxModule,
  MessageModule,
  TableModule,
  PanelMenuModule,
  DialogModule,
];
@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class PrimengModule {}
