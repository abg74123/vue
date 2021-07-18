import AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient({
    accessKeyId:'AKIAUAAOS6D3BWBSXFQN',
    secretAccessKey:'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',
    region:'us-east-2'
});

export default{
    docClient : docClient
}