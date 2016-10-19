import { Component, Input } from '@angular/core';
import { Variables, VariableReference } from './variableStorageService';

@Component({
    selector: 'cr-order-node',
    templateUrl: 'app/orderNode.component.html'
})
export class OrderNode {
    @Input() node: any;
    @Input() variables: Variables;

    constructor() {
    }

    isVariableNode() {
        return this.node instanceof VariableReference;
    }

    getVariable() {
        return this.variables.getVariable(this.node.id);
    }

    isValid() {
        if (this.isVariableNode()) {
            const variable = this.getVariable();
            return !!variable.name;
        }
        return true;
    }

}
