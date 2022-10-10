export const main = async event => {
    for (const message of event.Records) {
        const bodyData = JSON.parse(message.body);
        console.log('queued message with message:', bodyData);
    }
};
