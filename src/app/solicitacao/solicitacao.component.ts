import { DialogComponent } from './../dialog/dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SolicitacaoService } from '../solicitacao-service/solicitacao.service';
import { Solicitacao } from './solicitacao';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.sass']
})
export class SolicitacaoComponent implements OnInit {

  solicitacaoForm: FormGroup;
  public tipo: string;
  public solicitacaoID;

  constructor(private fb: FormBuilder,
              private solicitacaoService: SolicitacaoService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: BsModalService ) {

    this.tipo = this.route.snapshot.paramMap.get('tipo');
    this.solicitacaoID = this.route.snapshot.paramMap.get('solicitacao');

    if (this.solicitacaoID != 0) {
      this.solicitacaoService.getSolicitacaoById(this.solicitacaoID)
        .subscribe((data: Solicitacao) => {
          this.id.setValue(data.id);
          this.solicitante.setValue(data.solicitante);
          this.descProduto.setValue(data.descProduto);
          this.precoProduto.setValue(data.precoProduto);
        });
    }
  }

  ngOnInit() {
    this.solicitacaoForm = this.fb.group({
      id: new FormControl(null),
      solicitante: new FormControl({value: '', disabled: this.tipo == 'almoxarife'}, Validators.required),
      descProduto: new FormControl({value: '', disabled: this.tipo == 'almoxarife'}, Validators.required),
      precoProduto: new FormControl({value: 0, disabled: this.tipo == 'almoxarife'}, Validators.required),
      status: new FormControl('A'),
      observacao: new FormControl('')
    });

    this.solicitacaoForm.get('status').valueChanges.subscribe(value => {
      if (value == 'R') {
        this.solicitacaoForm.get('observacao').setValidators([Validators.required, Validators.minLength(5)]);
      } else {
        this.solicitacaoForm.get('observacao').clearValidators();
      }
      this.solicitacaoForm.get('observacao').updateValueAndValidity();
    });
  }

  get id() { return this.solicitacaoForm.get('id'); }
  get solicitante() { return this.solicitacaoForm.get('solicitante'); }
  get descProduto() { return this.solicitacaoForm.get('descProduto'); }
  get precoProduto() { return this.solicitacaoForm.get('precoProduto'); }
  get status() { return this.solicitacaoForm.get('status'); }
  get observacao() { return this.solicitacaoForm.get('observacao'); }

  onSubmit() {

    const solicitacao: Solicitacao = {
      id: this.id.value,
      solicitante: this.solicitante.value,
      descProduto: this.descProduto.value,
      precoProduto: this.precoProduto.value,
      status: this.status.value,
      observacao: this.observacao.value
    };

    if (this.tipo != 'almoxarife') {
      solicitacao.status = 'X';

      this.solicitacaoService.postForm(solicitacao)
        .subscribe(
          res => {
            this.openDlg('Sua solicitação foi salva com sucesso.', 'Sucesso!');
            this.solicitacaoForm.reset({precoProduto: 0});
          },
          err => {
            this.openDlg('Um erro ocorreu, tente novamente.', 'Erro!');
          }
        );
    } else {
      this.solicitacaoService.putForm(solicitacao)
        .subscribe(
          res => {
            this.openDlg('Sua aprovação/reprovação foi salva com sucesso.', 'Sucesso!');
            this.router.navigate(['/almoxarife/almoxarife']);
          },
          err => {
            this.openDlg('Um erro ocorreu, tente novamente.', 'Erro!');
          }
        );
    }

  }

  openDlg(msg: string, tituloP: string ) {
    const initialState = { mensagem: msg, titulo: tituloP};
    this.modalService.show(DialogComponent, { class: 'modal-sm', initialState });
  }
}
