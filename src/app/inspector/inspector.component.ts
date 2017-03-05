/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */


import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { NgRedux } from '@angular-redux/store';

import {
  ApplicationState,
  ObjectSelection,
  copySelection
} from '../state';

import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'design-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent implements OnInit {
  private colors = ['red', 'green', 'blue', 'white', 'grey'];
  private colorIndex: number = 0;
  private subscription : Subscription;
  private selectedObject: ObjectSelection;

  constructor(
    private ngRedux: NgRedux<ApplicationState>
  ) {}


  ngOnInit() {
    this.subscription = this.ngRedux.select<ObjectSelection>('selected')
      .subscribe(selectedValue => this.selectedObject = copySelection(selectedValue));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    } else {
      console.debug('No subscription to clean up');
    }
  }

  hasSelected() : boolean {
    return this.selectedObject != undefined;
  }

  onChangeColor() : void {
    console.debug("Change Color clicked");
  }

  nextColor() : string {
    let next = this.colors[this.colorIndex];
    this.colorIndex = (1 + this.colorIndex) % this.colors.length;
    return next;
  }
}
