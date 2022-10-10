# serverlessPersonService
The person service stores information about persons

This is a serverless architecture to manage persons. For now, we would like a nice list of persons to later work with, so for now, just the create Person function was created. Later on, ofcourse, it would be nice to also edit data from the user.

### AWS services used: 
For this architecture, AWS was used. 
The services used for this are: 

• Api gateway
• Lambda
• DynamoDB
• Cloudwatch
• SQS
• S3 is used out of the box by the serverless framework

the serverless framework is used, with the lambda's written in NodeJs.

### Wat does it do?
This service deploys an Api Gateway in a desired AWS account. When trigger the post request, created by API-gateway, a lambda function will be triggered. The event body, should look something like this:
`{
    "firstName": "firstName",
    "lastName": "lastName",
    "phoneNumber": "0612345678",
    "address": "niceStreet 40"
}`
When the person is successfully send, a new person will be added into DynamoDB. it will get an extra "id" field added, to make sure that later alteration will be done to the correct person input in the DynamoDb table.
Whenever this is finished, a message will be send to a SQS queue, so that other services can listen for it, and act upon it if needed. 

### How does to use?
Since the service uses serverless, please use 
```serverless configure```
to setup the access key values, for the desired AWS account it should be deployed in. The project uses the region eu-west-1 by default, but please feel free to alter this in the serverless.yml file, or add an extra flag when deploying.

In the serverless.yml file, some variables are specified. The framwork assumes that it will be deployed in a dev environment, but ofcourse its also possible to deploy it in (for example) a prod environment. This can be done by adding and extra flag to the deployment
```serverless deploy --stage prod```
a script for this was added, so its also possible to run: 
```npm run deploy:dev | npm run deploy:prod```

When everything is deployed in the desired AWS environment, please feel free to use the Postman collection, that can be found in the Supporting Files folder. Please update the variables, and start testing right away

### What should be improved
• tests need to be added
• diagram in readme file
• more thorough error handling
