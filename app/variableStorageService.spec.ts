/* tslint:disable:no-unused-variable */
import { VariableStorageService, Variables, Order } from './variableStorageService';
import { async, TestBed } from '@angular/core/testing';

import { inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import 'rxjs/add/operator/toPromise';

describe('VariableStorageService', function () {
    let variableStorageService, mockBackend, connection;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [VariableStorageService, MockBackend, BaseRequestOptions,
                {
                    provide: Http, useFactory: (backend, options) => {
                        return new Http(backend, options);
                    }, deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
        variableStorageService = TestBed.get(VariableStorageService);
        mockBackend = TestBed.get(MockBackend);
        mockBackend.connections.subscribe(c => connection = c);
    }));

    const mockReponse = body => {
        connection.mockRespond(new Response(new ResponseOptions({
            body
        })));
    };

    it('should provide getVariables()', (done) => {
        let variablesPromise = variableStorageService.getVariables('ignored');
        mockReponse({
            index: {v1: {name: 'V1'}, v2: {}}
        });
        variablesPromise
            .then(variables => {
                expect(variables instanceof Variables).toBe(true);
                expect(variables.getVariable('v1').name).toBe('V1');
                done();
            });

    });

     it('should provide getOrder()', (done) => {
        let variablesPromise = variableStorageService.getOrder('ignored');
        mockReponse({
            graph: ['v1', 'v2']
        });
        variablesPromise
            .then(order => {
                expect(order instanceof Order).toBe(true);
                expect(order.getRoot().getChildren().length).toBe(2);
                done();
            });

    });
});
