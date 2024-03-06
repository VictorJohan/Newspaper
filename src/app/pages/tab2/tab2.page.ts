import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/topHeadLines';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  noticias: Article[] = [];
  segment= '';
  
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  constructor(private noticiasService: NoticiasService) { 
    
  }

  ngOnInit() {
    
    this.segment = this.categorias[0];
   this.cargarNoticias();
  }

  getNoticias() {
    this.noticias = [];
    this.noticiasService.getTopHeadlinesCategory(this.segment).subscribe(resp => {
      this.noticias = resp.articles; 
    });
  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasService.getTopHeadlinesCategory(this.segment).subscribe(resp => {
      
      this.noticias.push(...resp.articles);
  
      if (event) {
        event.target.complete();
      }
    });
  }
}
