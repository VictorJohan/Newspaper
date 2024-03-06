import { Component } from '@angular/core';
import { TopHeadLines } from 'src/app/interfaces/topHeadLines';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../../interfaces/topHeadLines';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {
   this.cargarNoticias();
  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasService.getTopHeadlines().subscribe(resp => {
      if(resp.articles.length === 0) {
        event.target.complete();
        event.target.disabled = true;
        return;
      }
      
      this.noticias.push(...resp.articles);
      
      if (event) {
        event.target.complete();
      }
    });
  }
}
