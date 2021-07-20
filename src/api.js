import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';

let s3Client;
let s3Bucket;
let s3FileName;

export function initialize({ credentials, region, bucket, fileName }) {
    const missingKeys = [];
    if (!credentials?.accessKeyId) {
        missingKeys.push('credentials.AWS_ACCESS_KEY');
    }
    if (!credentials?.secretAccessKey) {
        missingKeys.push('credentials.AWS_ACCESS_SECRET');
    }
    if (!region) {
        missingKeys.push('AWS_REGION');
    }
    if (!bucket) {
        missingKeys.push('AWS_BUCKET_NAME');
    }
    if (!fileName) {
        missingKeys.push('AWS_FILE_NAME');
    }

    if (missingKeys.length) {
        throw new Error(
            `Missing AWS configuration: [${missingKeys.join(', ')}]`
        );
    }

    s3Client = new S3Client({ region, credentials });
    s3Bucket = bucket;
    s3FileName = fileName;
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
        Bucket: s3Bucket,
        Key: s3FileName,
        ResponseCacheControl: 'no-cache',
    };

    // Create an object and upload it to the Amazon S3 bucket.
    const { Body } = await s3Client.send(new GetObjectCommand(params));
    return await streamToString(Body);
}

export async function saveTodoList(rawTodoList) {
    const params = {
        Bucket: s3Bucket,
        Key: s3FileName,
        Body: rawTodoList,
    };

    // Create an object and upload it to the Amazon S3 bucket.
    await s3Client.send(new PutObjectCommand(params));
}
