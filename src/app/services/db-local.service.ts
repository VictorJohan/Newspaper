import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { Article } from '../interfaces/topHeadLines';
@Injectable({
  providedIn: 'root'
})
export class DbLocalService {

  private _storage = null;
  noticias: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }
  async init() {
    if (this._storage == null) {
      const storage = await this.storage.create();
      this._storage = storage;
    }
  }

  async setNoticiaTofavorite(noticia: Article) {
    this.init();
    await this.getNoticiasFromFavoritos().then(data => {
      this.noticias = data as Article[];

      if (this.noticias != null || this.noticias != undefined) {
        this.noticias.unshift(noticia);
        this._storage.set('noticias', this.noticias);
      }

    });

  }
  async getNoticiasFromFavoritos() {
    await this.init();
    const data = await this._storage.get('noticias').then(data => {
      debugger;
      if (data != null) {
        this.noticias = data as Article[];
        return data;
      }
      return new Array<Article>();
    });

    return data;
  }

  get getNoticias() {
    return this.noticias;
  }

  deleteNoticiaFromFavoritos(noticia: Article) {
    this.init();
    this._storage.get('noticias').then(data => {
      this.noticias = data as Article[];
      this.noticias = this.noticias.filter(noticia => noticia.title != noticia.title);
      this._storage.set('noticias', this.noticias);
    });
  }
}
