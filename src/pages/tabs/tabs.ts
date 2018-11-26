import { Component } from '@angular/core';

import { ListPage } from '../list/list';
import { ConfigPage } from '../config/config';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  mapRoot = MapPage;
  listRoot = ListPage;
  configRoot = ConfigPage;

  constructor() {

  }
}
