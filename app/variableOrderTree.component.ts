import { Component, OnInit, Input } from '@angular/core';
import { VariableStorageService, Order, Variables } from './variableStorageService';


@Component({
    selector: 'cr-variable-order-tree',
    templateUrl: 'app/variableOrderTree.component.html'
})

export class VariableOrderTree implements OnInit {
    @Input()
    dataSetId: string;
    order: Order;
    variables: Variables;

    constructor(private variableStorageService: VariableStorageService) {
    }

    fetchData(): void {
        Promise.all([
            this.variableStorageService
                .getOrder(this.dataSetId),
            this.variableStorageService.getVariables(this.dataSetId)
        ])
            .then(result => {
                this.order = result[0];
                this.variables = result[1];
            });
    }
    ngOnInit(): void {
        this.fetchData();
    }
}
