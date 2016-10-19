import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { VariableOrderService } from './variableOrderService';
import { VariableStorageService } from './variableStorageService';
import { AppComponent } from './app.component';
import { VariableOrderTree } from './variableOrderTree.component';
import { OrderNode } from './orderNode.component';

@NgModule({
  declarations: [ AppComponent, VariableOrderTree, OrderNode ],
  imports: [ BrowserModule, HttpModule, JsonpModule ],
  providers: [ VariableOrderService, VariableStorageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
