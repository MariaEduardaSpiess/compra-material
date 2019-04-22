import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { SolicitacaoService } from './solicitacao-service/solicitacao.service';
import { MenuComponent } from './menu/menu.component';
import { AlmoxarifeComponent } from './almoxarife/almoxarife.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SolicitacaoComponent,
    MenuComponent,
    AlmoxarifeComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  entryComponents: [DialogComponent],
  providers: [HttpClientModule, SolicitacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
