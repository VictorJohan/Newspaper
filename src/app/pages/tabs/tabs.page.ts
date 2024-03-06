import { Component } from '@angular/core';
import { DbLocalService } from '../../services/db-local.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private db: DbLocalService) {}

  async refrescarFavoritos(){
    await this.db.getNoticiasFromFavoritos().then();
  }
}
