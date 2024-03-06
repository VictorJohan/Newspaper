import { Component, Input, OnInit } from '@angular/core';
import { TopHeadLines, Article } from 'src/app/interfaces/topHeadLines';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() isFavorito = false;
 @Input() noticias: Article[] = [];

  constructor() {
    
  }

  ngOnInit() {
  
  }

}
