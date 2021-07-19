import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';

let s3Client;
let s3Configuration;

export function initialize({ credentials, configuration }) {
    s3Client = new S3Client({ region: configuration.region, credentials });
    s3Configuration = configuration;
}

// https://github.com/aws/aws-sdk-js-v3/issues/1877#issuecomment-776187712
const streamToString = (stream) => {
    return new Promise((resolve, reject) => {
        if (stream instanceof ReadableStream === false) {
            reject(
                'Expected stream to be instance of ReadableStream, but got ' +
                    typeof stream
            );
        }
        let text = '';
        const decoder = new TextDecoder('utf-8');

        const reader = stream.getReader();
        const processRead = ({ done, value }) => {
            if (done) {
                resolve(text);
                return;
            }

            text += decoder.decode(value);

            // Not done, keep reading
            reader.read().then(processRead);
        };

        // start read
        reader.read().then(processRead);
    });
};

export async function fetchPersistedTodoList() {
    const params = {
        Bucket: s3Configuration.bucket,
        Key: s3Configuration.fileName,
    };

    // TODO: Handle errors!
    // Create an object and upload it to the Amazon S3 bucket.
    const { Body } = await s3Client.send(new GetObjectCommand(params));
    return await streamToString(Body);
}

export async function saveTodoList(rawTodoList) {
    const params = {
        Bucket: s3Configuration.bucket,
        Key: s3Configuration.fileName,
        Body: rawTodoList,
    };

    // TODO: Handle errors!
    // Create an object and upload it to the Amazon S3 bucket.
    await s3Client.send(new PutObjectCommand(params));
}
