import LWWElementSet, {LWWStruct} from './src';

describe('Run test cases LWW-Element-Set CRDT', () => {
    const elementSet = new LWWElementSet();
    it('Inserting data to LWWElementSet', () => {
        let mocksData = [
            {string: 'Action #1', timestamp: 2, isValid: false,},
            {string: 'Action #1', timestamp: 1, isValid: false,},
            {string: 'Action #1', timestamp: 5, isValid: true,},
            {string: 'Action #2', timestamp: 3, isValid: true,},
            {string: 'Action #2', timestamp: 1, isValid: false,},
            {string: 'Action #3', timestamp: 2, isValid: false,},
            {string: 'Action #3', timestamp: 3, isValid: false,},
            {string: 'Action #3', timestamp: 5, isValid: true,},
        ];
        mocksData.map((record) => {
            elementSet.add(record.string, record.timestamp);
        });
        expect(elementSet.addSet).toEqual(
            mocksData.filter(item => item.isValid).map(item => item = new LWWStruct(item.string, item.timestamp)),
        );
    });

    it('Removing data from LWWElementSet', () => {
        let mocksData = [
            {string: 'Action #1', timestamp: 2, isValid: false,},
            {string: 'Action #1', timestamp: 1, isValid: false,},
            {string: 'Action #1', timestamp: 5, isValid: true,},
            {string: 'Action #2', timestamp: 3, isValid: true,},
            {string: 'Action #2', timestamp: 1, isValid: false,},
        ];
        mocksData.map((record) => {
            elementSet.remove(record.string, record.timestamp);
        });

        expect(elementSet.removeSet).toEqual(
            mocksData.filter(item => item.isValid).map(item => item = new LWWStruct(item.string, item.timestamp)),
        );
    });

    it('Getting merged data from LWWElementSet', () => {
        let mocksData = [
            {string: 'Action #3', timestamp: 5, isValid: true,},
        ];

        expect(elementSet.list()).toEqual(
            mocksData.filter(item => item.isValid).map(item => item = new LWWStruct(item.string, item.timestamp)),
        );
    });
});