require 'aws-sdk'
require 'elasticsearch'
require 'json'

credentials = JSON.parse(File.read './config/s3-credentials-server.json')

AWS.config(
  access_key_id: credentials['accessKey'],
  secret_access_key: credentials['secretKey'],
  region: 'us-east-1'
)

es = Elasticsearch::Client.new log: true

def es_index client, key, body
  client.index index: 'cryptogem', type: 'locator', id: key, body: body
end

queue = AWS::SQS.new.queues.named 'crytogem-locator'
while true
  queue_message = queue.receive_message

  if queue_message

    puts 'found message'

    puts queue_message.body

    message = JSON.parse queue_message.body

    def s3
      AWS::S3.new.buckets['cryptogem.locator']
    end

    def get_from_s3 key
      s3.objects[key].read
    end

    records = message['Records'].map { |record|
      begin
        content = get_from_s3 record['s3']['object']['key']
        metadata = content.split('$$').first
      rescue AWS::S3::Errors::AccessDenied
        queue_message.delete
        metadata = ''
      end

      if !metadata.empty?
        metadata = JSON.parse metadata

        {
          'time' => record['eventTime'],
          'ip' => record['requestParameters']['sourceIPAddress'],
          'key' =>  record['s3']['object']['key'],
          'eTag' =>  record['s3']['object']['eTag'],
        }.merge metadata
      else
        false
      end
    }.select{ |gem| gem }.each { |gem|
      es_index es, gem['key'], gem
    }

    queue_message.delete
    puts records
  end

  sleep 1
end

