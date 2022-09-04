const AWS = require('aws-sdk');
const s3 = AWS.S3();

module.exports.handler = async event => {
    console.log(event);

    const response = {
        statusCode: 200
    }

    try {
        const parsedBody = JSON.parse(event.body);
        const params = {
            Bucket: BUCKET_NAME,
            Body: parsedBody,
            ContentType: 'application/json',
        };
        const uploadResult = await s3.upload(params).promise();
        response.body = JSON.stringify({ message: "Successfully uploaded file to S3", Message: uploadResult });
    }
    catch (err) {
        console.log(err);
        response.body = JSON.stringify({ message: "File failed to upload.", errorMessage: e });
        response.statusCode = 500;
    }

    return response;
}