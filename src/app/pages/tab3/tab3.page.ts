import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Article } from 'src/app/interfaces/topHeadLines';
import { DbLocalService } from '../../services/db-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  noticias: Article[] = [];

  constructor(public db: DbLocalService) {
   
   
  }
  
  
}
