import { Injectable } from '@angular/core';
import { Order, VariableReference } from './variableStorageService';

@Injectable()
export class VariableOrderService {

    constructor() { }

    getPosition(order: Order, variableId: String) {
        const getPosition = (node, positionTo) => {
            if (node instanceof VariableReference) {
                return node.id === variableId && positionTo;
            }
            let result;
            node.getChildren().find((child, i) => {
                let positionToHere = positionTo.concat(child.name || i);
                result = getPosition(child, positionToHere);
                return result;
            });
            return result;
        };
        return getPosition(order.getRoot(), []);
    }

    getVariableIdAtPosition(order: Order, position: string[]) {
        const getVariableId = (node, relativePosition) => {
            if (relativePosition.length === 0) {
                return node instanceof VariableReference && node.id;
            }
            let nextMove = relativePosition[0];
            let restPosition = relativePosition.slice(1);
            let nextChild = node.getChildren()
                .find((child, i) => i === nextMove || child.name === nextMove);
            return !!nextChild && getVariableId(nextChild, restPosition);
        };

        return getVariableId(order.getRoot(), position);
    }


}

