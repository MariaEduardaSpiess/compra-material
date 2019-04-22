import { AlmoxarifeComponent } from './almoxarife/almoxarife.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'solicitacao/:tipo/:solicitacao', component: SolicitacaoComponent},
  {path: 'almoxarife/:tipo', component: AlmoxarifeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
