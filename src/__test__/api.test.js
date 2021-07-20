import { initialize } from '../api';

describe('api test suite', () => {
    test.each([
        null,
        undefined,
        { credentials: null },
        { credentials: undefined },
        { region: null },
        { region: {} },
        { bucket: null },
        { bucket: {} },
        { fileName: null },
        { fileName: {} },
        {
            credentials: { accessKeyId: 'asdf', secretAccessKey: '1234' },
            region: null,
            bucket: null,
            fileName: null,
        },
        {
            credentials: { accessKeyId: 'asdf', secretAccessKey: '1234' },
            region: 'test',
            bucket: null,
            fileName: null,
        },
        {
            credentials: { accessKeyId: 'asdf', secretAccessKey: '1234' },
            region: 'test',
            bucket: 'test',
            fileName: null,
        },
    ])(
        'initialize with missing credentials and configuration',
        (awsConfiguration) => {
            expect(() => {
                initialize(awsConfiguration);
            }).toThrow();
        }
    );

    test('initialize with valid credentials', () => {
        initialize({
            credentials: { accessKeyId: 'asdf', secretAccessKey: '1234' },
            region: 'test',
            bucket: 'test',
            fileName: 'test',
        });
    });
});
