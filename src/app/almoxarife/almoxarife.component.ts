import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Solicitacao } from './../solicitacao/solicitacao';
import { SolicitacaoService } from './../solicitacao-service/solicitacao.service';
import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-almoxarife',
  templateUrl: './almoxarife.component.html',
  styleUrls: ['./almoxarife.component.sass']
})
export class AlmoxarifeComponent implements OnInit{

  public solicitacoes: Solicitacao[];
  public tipo: string;
  public modalRef: BsModalRef;
  filtroForm: FormGroup;

  constructor(private fb: FormBuilder,
              private solicitacaoService: SolicitacaoService,
              private route: ActivatedRoute,
              private modalService: BsModalService) {

    this.tipo = this.route.snapshot.paramMap.get('tipo');

    if (this.tipo == 'administrativo') {
      this.solicitacaoService.getSolicitacoes()
        .subscribe((data: Solicitacao[]) => {
          this.solicitacoes = data;
          console.log(this.solicitacoes);
        });
    } else {
      this.solicitacaoService.getSolicitacoesByStatus('X')
        .subscribe((data: Solicitacao[]) => {
          this.solicitacoes = data;
          console.log(this.solicitacoes);
        });
    }
  }

  ngOnInit() {
    this.filtroForm = this.fb.group({
      solicitante: '',
      descProduto: '',
      status: ''
    });
  }

  get solicitante() { return this.filtroForm.get('solicitante'); }
  get descProduto() { return this.filtroForm.get('descProduto'); }
  get status() { return this.filtroForm.get('status'); }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }

  onSubmit() {

    const solicitacao: Solicitacao = {
      id: 0,
      solicitante: this.solicitante.value,
      descProduto: this.descProduto.value,
      precoProduto: 0,
      status: this.status.value,
      observacao: ''
    };

    this.solicitacaoService.getSolicitacaoByFilter(solicitacao)
      .subscribe((res: Solicitacao[]) => {
        this.solicitacoes = res;
        this.modalRef.hide();
      });
  }
}
