import {
  Component,
  OnInit
} from '@angular/core';



@Component({
  selector: 'design-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent implements OnInit {
  private colors = ['red', 'green', 'blue', 'white', 'grey'];
  private colorIndex: number = 0;

  constructor() {}


  ngOnInit() {
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
