import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { TopHeadLines } from '../interfaces/topHeadLines';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  key = environment.apiKey;
  page = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  getTopHeadlines() {
    this.page++;
    return this.http.get<TopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.key}&page=${this.page}`);
  }

  getTopHeadlinesCategory(category: string) {
    if (this.categoriaActual === category) {
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = category;
    }

    return this.http.get<TopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${this.key}&page=${this.categoriaPage}`);
  }
}
