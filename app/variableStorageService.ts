import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class VariableStorageService {
    private variablesUrl = 'fixtures/variables.json';
    private orderUrl = 'fixtures/order.json';

    constructor(private http: Http) { }

    getVariables(dataSetId: string): Promise<Variables> {
        return this.http.get(this.variablesUrl)
            .toPromise()
            .then(response => new Variables(response.json()));
    }

    getOrder(dataSetId: string): Promise<Order> {
        return this.http.get(this.orderUrl)
            .toPromise()
            .then(response => new Order(response.json()));
    }
}

export class Variables {
    index: Object[];
    constructor(json) {
        Object.assign(this, json);
    }

    getVariable(id: string): Variable {
        const variableJson = this.index[id];
        return variableJson && new Variable(id, variableJson);
    }
}

class Variable {
    id: string;
    name: string;
    type: string;
    description: string;
    constructor(id, json) {
        this.id = id;
        Object.assign(this, json);
    }
}

export class Order {
    graph: any[];
    constructor(json) {
        Object.assign(this, json);
    }
    getRoot(): Node {
        return new HierarchyNode({ root: this.graph });

    }
}

export class Node {
}

export class VariableReference extends Node {
    id: String;
    constructor(id) {
        super();
        this.id = id;
    }
}

export class HierarchyNode extends Node {
    name: string;
    children: Object[];

    constructor(node) {
        super();
        this.name = Object.getOwnPropertyNames(node)[0];
        this.children = node[this.name];
    }

    getChildren() {
        return this.children.map(node => {
            if (typeof (node) === 'string') {
                return new VariableReference(node);
            }
            return new HierarchyNode(node);
        });
    }
}
