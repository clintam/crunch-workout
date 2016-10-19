/* tslint:disable:no-unused-variable */
import { Order } from './variableStorageService';
import { VariableOrderService } from './variableOrderService';

describe('VariableOrderService', function () {
    let variableOrderService;
    let order = new Order({
        graph: ['v1',
            {
                h1: [
                    { h2: ['not', 'a', 'match'] },
                    'miss',
                    { h3: ['v0', 'v2'] }
                ]
            }
        ]
    });
    beforeEach(() => {
        variableOrderService = new VariableOrderService();
    });

    describe('getPosition(order, variableId)', () => {

        it('should match top-level variables', () => {
            let position = variableOrderService.getPosition(order, 'v1');
            expect(position).toEqual([0]);
        });

        it('should match variables in hierarchy', () => {
            let position = variableOrderService.getPosition(order, 'v2');
            expect(position).toEqual(['h1', 'h3', 1]);
        });

        it('should return false for no match', () => {
            let position = variableOrderService.getPosition(order, 'v3');
            expect(position).toBe(false);
        });

    });

    describe('getVariableIdAtPosition(order, position)', () => {

        it('should find top-level positions', () => {
            let variableId = variableOrderService.getVariableIdAtPosition(order, [0]);
            expect(variableId).toEqual('v1');
        });

        it('should find positions in hierarchy', () => {
            let variableId = variableOrderService.getVariableIdAtPosition(order, ['h1', 'h3', 1]);
            expect(variableId).toEqual('v2');
        });

        it('should return false for invalid position (does not end in number)', () => {
            let variableId = variableOrderService.getVariableIdAtPosition(order, ['h1', 'h3']);
            expect(variableId).toEqual(false);
        });

         it('should return false for no variable at position', () => {
            let variableId = variableOrderService.getVariableIdAtPosition(order, [1]);
            expect(variableId).toEqual(false);
        });

          it('should return false for no hierarchy at position', () => {
            let variableId = variableOrderService.getVariableIdAtPosition(order, ['not found', 1]);
            expect(variableId).toEqual(false);
        });
    });



});
