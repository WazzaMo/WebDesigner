import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { NgRedux } from '@angular-redux/store';

import {
  ApplicationState,
  ObjectSelection
} from '../state';

@Component({
  selector: 'design-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent implements OnInit {
  private colors = ['red', 'green', 'blue', 'white', 'grey'];
  private colorIndex: number = 0;
  private subscription;
  private selectedObject: ObjectSelection;

  constructor(
    private ngRedux: NgRedux<ApplicationState>
  ) {
    this.subscription = ngRedux.select<ObjectSelection>('selected')
    .subscribe()
  }


  ngOnInit() {
  }

  ngOnDestroy() {

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
