import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/topHeadLines';
import { Browser } from '@capacitor/browser';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { DbLocalService } from 'src/app/services/db-local.service';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() isFavoritoTab = false;
  @Input() noticia: Article;
  constructor(public actionSheetController: ActionSheetController,
    private db: DbLocalService,
    public toast: ToastController) { }

  ngOnInit() { }

  async verNoticia() {
    await Browser.open({ url: this.noticia.url });
  }

  async menuNoticia() {

    let borrarAgregarBtn;

    if (!this.isFavoritoTab) {
      borrarAgregarBtn = {

        text: 'Favorito',
        icon: 'star',
        handler: async () => {
          await this.db.setNoticiaTofavorite(this.noticia).then(() => {
            this.presentToast('Noticia agregada a favoritos');
          });
        }

      };
    }else{
      borrarAgregarBtn = {
        text: 'Remover',
        icon: 'trash',
        handler: () => {
          this.db.deleteNoticiaFromFavoritos(this.noticia);
          this.presentToast('Noticia removida de favoritos');
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share-social-outline',
        data: 10,
        handler: async () => {
          await Share.share({
            title: 'See cool stuff',
            text: 'Really awesome thing you need to see right meow',
            url: this.noticia.url,
            dialogTitle: 'Share with buddies',
          });

        }
      },
      borrarAgregarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });

    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();

  }

  async presentToast(msj: string) {
    const toast = await this.toast.create({
      message: msj,
      color: 'black',
      duration: 2000
    });
    toast.present();
  }
}

