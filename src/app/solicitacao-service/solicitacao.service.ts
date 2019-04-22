import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Solicitacao } from '../solicitacao/solicitacao';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  private url = 'http://localhost:8080/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  postForm(solicitacao: Solicitacao): Observable<Solicitacao> {
    return this.http.post<Solicitacao>(this.url + 'solicitacao', solicitacao)
      .pipe(
        map(el => {
          return el;
        }),
        catchError(err => {
          return Observable.throw(err);
        })
      );
  }

  putForm(solicitacao: Solicitacao): Observable<Solicitacao> {
    return this.http.put<Solicitacao>(this.url + 'solicitacao', solicitacao)
      .pipe(
        map(el => {
          return el;
        }),
        catchError(err => {
          return Observable.throw(err);
        })
      );
  }

  getSolicitacoes() {
    return this.http.get(this.url + 'solicitacoes');
  }

  getSolicitacoesByStatus(status: string) {
    return this.http.get(this.url + 'solicitacoes/' + status);
  }

  getSolicitacaoById(id: string) {
    return this.http.get(this.url + 'solicitacao/' + id);
  }

  getSolicitacaoByFilter(filter: Solicitacao) {
    return this.http.get(this.url + 'solicitacoesFilter?status=' + filter.status + '&solicitante='
      + filter.solicitante + '&descProduto=' + filter.descProduto);
  }
}
