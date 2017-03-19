import {
  Component,
  OnInit,
  Input,
  ElementRef
} from '@angular/core';

import { NgRedux } from '@angular-redux/store';

import {
  JQueryElement,
  JQueryNode,
  JQueryTools,
  JQueryElementFactory
} from '../jquery';

import {
  ViewEntity,
  EntityComponent,
  EntitySelection
} from '../state';

import {
  StateActions,
  Options,
  ApplicationState
} from '../state';



@Component({
  selector: 'visualise-entity',
  templateUrl: './visualise-entity.component.html',
  styleUrls: ['./visualise-entity.component.css']
})
export class VisualiseEntityComponent implements OnInit {
  private element: JQueryElement;
  private node: JQueryNode;

  @Input('entity-object') entity: ViewEntity;

  constructor(
    private ngRedux: NgRedux<ApplicationState>,
    private stateActions: StateActions,
    private baseElement: ElementRef,
    private jqueryFactory: JQueryElementFactory
  ) { }

  ngOnInit() {
    this.element = this.jqueryFactory.createJQueryElement(this.baseElement);
    this.node = JQueryTools.findFirst(this.element, `#${this.entity.id}`);
    this.applyStyling();
  }

  public clickedObject(name: string, options: Options) {
    console.log(name);
    this.ngRedux.dispatch( this.stateActions.select(<EntitySelection>{name: name, options: options}) );
  }

  private applyStyling() : void {
    if(this.node) {
      this.node.css('border-color', '1px solid red');
      this.entity.components.forEach(component => {
        component.styles.forEach(style=> {
          console.debug(`Applying style |${style.cssKey}:${style.cssValue}|`);
          this.node.css(style.cssKey, style.cssValue); 
        });
      })
    } else {
      console.debug(`Node ID: ${this.entity.id} not found`);
    }
  }
}
