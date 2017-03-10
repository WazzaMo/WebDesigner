/*
 * (c) Copyright 2017 Warwick Molloy
 *
 * Licence: GNU Public Licence version 3
 * See LICENCE.md in project directory
 * See https://www.gnu.org/licenses/lgpl.md
 */

import { Entity } from './entity';
import { Value } from '../spec/value.helper';

interface EntityThing {
    name: string;
    id: number;
    children: Array<EntityThing>;
}

function ToThing(inObject: Entity) : EntityThing {
    return <EntityThing> <any> inObject;
}

describe('Entity', () => {
    let subject: Entity;

    describe('getId', () => {
        let anId: number;

        beforeEach(() => {
            anId = Value.a_number();
            subject = new Entity(Value.a_string(), anId);
        })

        it('should return the id given at construction', () => expect(subject.getId()).toBe(anId));
    })

    describe('getName', ()=> {
        let aName: string;

        beforeEach(() => {
            aName = Value.a_string();
            subject = new Entity(aName, Value.a_number());
        })

        it('returns the name given at construction', () => expect(subject.getName()).toBe(aName));
    })

    describe('add', () => {
        let newEntity: Entity;

        beforeEach(() => {
            subject = new Entity(Value.a_string(), Value.a_number());
        })

        it('returns the new entity', () => {
            let name: string = Value.a_string();
            let id : number = Value.a_number();

            newEntity = subject.add(name, id);
            expect(newEntity.getName()).toBe(name);
            expect(newEntity.getId()).toBe(id);
        })

        describe('appends the new entity to children', () => {
            let peekIntoEntity : any;
            let name: string;
            let id: number;

            beforeEach(()=>{
                name = Value.a_string();
                id = Value.a_number();
                newEntity = subject.add(name, id);
                peekIntoEntity = <any> subject;
            })

            it('results in more than 0 children', () => expect(peekIntoEntity.children.length).toBeGreaterThan(0));

            it("first child's name matches", () => expect(peekIntoEntity.children[0].name).toBe(name));

            it('a child to have a child', () => {
                let grandchild = newEntity.add(Value.a_string(), Value.a_number());

                expect(peekIntoEntity.children[0].children[0]).toBe(grandchild);
            })
        })
    })

    describe('copyFrom', () => {
        let subjectsChild: Entity;
        let subjectsGrandchild: Entity;
        let copy: EntityThing;

        beforeEach(()=>{
            subject = new Entity(Value.a_string(), 1);
            subjectsChild = subject.add(Value.a_string(), Value.a_number());
            subjectsGrandchild = subjectsChild.add(Value.a_string(), Value.a_number());
            copy = ToThing(Entity.copyFrom(subject));
        })

        it('must return a defined value for a define argument', ()=> expect(copy).toBeDefined());

        it('make same number of objects', () => {
            expect(copy.children.length).toBe(1);
            expect(copy.children[0].children.length).toBe(1);
        })
    })

    describe('forAll', () => {
        let child1, child2: Entity;
        let grandchild1, grandchild2: Entity;
        let jobMock: (e: Entity, depth: number) => void;

        function showChild(e: Entity, depth: number) : void {
            let child = ToThing(e);
            console.debug(
                `forAll( ${child.name} | ${child.id} | ${child.children.length} , ${depth} )`
            );
        }

        function getEntity(spy: jasmine.Spy, callIndex: number) : EntityThing {
            return ToThing(spy.calls.argsFor(callIndex)[0]);
        }

        function getDepth(spy: jasmine.Spy, callIndex: number) : number {
            return spy.calls.argsFor(callIndex)[1];
        }

        beforeEach(() => {
            subject = new Entity('root', 0);
            child1 = subject.add('child1', 1);
            child2 = subject.add('child2', 2);
            grandchild1 = child1.add('grandchild1',3);
            grandchild2 = child1.add('grandchild2', 4);
        })

        it('should call the task once per entity ', () => {
            jobMock = jasmine.createSpy('forAllJob');
            subject.forAll( (entity, depth) => {
                showChild(entity, depth);
                jobMock(entity, depth);
            });
            expect(jobMock).toHaveBeenCalledTimes(5);
        })

        describe('Should provide the callback with entity and depth', () => {
            let mock: jasmine.Spy;

            beforeAll(()=>{
                mock = jasmine.createSpy('task');
                subject.forAll( (entity, depth) => {
                    showChild(entity, depth);
                    mock(entity, depth);
                });
            })

            it('should pass root entity first', ()=>{
                expect(getEntity(mock,0).name).toBe('root', 'name did not match');
                expect(getEntity(mock,0).id).toBe(0,"ID didn't match");
                expect(getDepth(mock,0)).toBe(0, 'depth did not match');
            })

            it('should pass first child', () => {
                expect(getEntity(mock,1).name).toBe('child1', 'name did not match');
                expect(getEntity(mock,1).id).toBe(1,"ID didn't match");
                expect(getDepth(mock,1)).toBe(1, 'depth did not match');
            })

            it('should pass first grandchild', () => {
                expect(getEntity(mock,2).name).toBe('grandchild1', 'name did not match');
                expect(getEntity(mock,2).id).toBe(3,"ID didn't match");
                expect(getDepth(mock,2)).toBe(2, 'depth did not match');
            })

            it('should pass second grandchild', () => {
                expect(getEntity(mock,3).name).toBe('grandchild2', 'name did not match');
                expect(getEntity(mock,3).id).toBe(4,"ID didn't match");
                expect(getDepth(mock,3)).toBe(2, 'depth did not match');
            })

            it('should pass second child', () => {
                expect(getEntity(mock,4).name).toBe('child2', 'name did not match');
                expect(getEntity(mock,4).id).toBe(2,"ID didn't match");
                expect(getDepth(mock,4)).toBe(1, 'depth did not match');
            })
        })

            // expect(jobMock).toHaveBeenCalledWith(
            //     [subject, 0],
            //     [child1, 1],
            //     [grandchild1, 2],
            //     [grandchild2,2],
            //     [child2, 2]
            // );
    })
})