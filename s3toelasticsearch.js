var _ = require('lodash');
var ElasticSearch = require('elasticsearch');
var AWS = require('aws-sdk');

var creds = require('./config/s3-credentials-server');
var es = ElasticSearch.Client({
    host: 'localhost:9200',
});

var credentials = {
    'accessKeyId': creds.accessKey,
    'secretAccessKey': creds.secretKey,
    'region': 'us-east-1'
};

AWS.config.update(credentials);

var sqs = new AWS.SQS();

sqs.receiveMessage(
    {
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/612862531910/crytogem-locator',
        MaxNumberOfMessages: 1,
    },
    function(error, data) {
        if (error) {
            return console.log('Error: ', error);
        }

        console.log('Raw: ', data);
        console.log('------');

        if (!data.Messages) { return; }

        data.Messages.forEach(function(message) {
            if (message.Body) {
                var putEvents = JSON.parse(message.Body).Records;
                if (!putEvents || !_.isArray(putEvents)) {
                    debugger;
                    return sqs.deleteMessage({
                        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/612862531910/crytogem-locator',
                        ReceiptHandle: message.ReceiptHandle
                    }, function(error) {
                        if (error) {
                            throw error;
                        }
                    });
                }
debugger;

                console.log(message);

                var events = _.map(putEvents, function(event) {
                    if (typeof event == 'object') {
                        return {
                            time: event.eventTime,
                            ip: event.requestParameters.sourceIPAddress,
                            eTag: event.s3.object.eTag,
                            key: event.s3.object.key,
                            size: event.s3.object.size,
                        };
                    } else {
                        return null;
                    }
                });

                var events =  _.filter(_.flatten(events), function(event) { return event; });

                events.forEach(function(event) {
                    debugger;
                    console.log('\nsaving: ', event);
                    es.create({
                        index: 'cryptogem',
                        type: 'locator',
                        id: event.key,
                        body: event
                    }, function(error, response) {
                        if (error) {
                            if (error.message.indexOf('DocumentAlreadyExistsException') === 0) {
                                console.log('duplicated doc');

                                sqs.deleteMessage({
                                    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/612862531910/crytogem-locator',
                                    ReceiptHandle: message.ReceiptHandle
                                }, function(error) {
                                    if (error) {
                                        throw error;
                                    }

                                    console.log('Remove processed message');
                                    process.exit();
                                });
                            } else {
                                throw(error);
                            }
                        } else {
                            sqs.deleteMessage({
                                QueueUrl: 'https://sqs.us-east-1.amazonaws.com/612862531910/crytogem-locator',
                                ReceiptHandle: message.ReceiptHandle
                            }, function(error) {
                                if (error) {
                                    throw error;
                                }
                                console.log('Remove processed message');
                                process.exit();
                            });
                        }
                    });
                });
            }

        });

    }
);
