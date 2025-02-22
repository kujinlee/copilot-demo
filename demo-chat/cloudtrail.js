const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' });

const cloudtrail = new AWS.CloudTrail();

// Function to describe trails
const describeTrails = async () => {
    try {
        const data = await cloudtrail.describeTrails().promise();
        console.log('Trails:', data.trailList);
    } catch (error) {
        console.error('Error describing trails:', error);
    }
};

// Function to get trail status
const getTrailStatus = async (trailName) => {
    try {
        const params = { Name: trailName };
        const data = await cloudtrail.getTrailStatus(params).promise();
        console.log('Trail status:', data);
    } catch (error) {
        console.error('Error getting trail status:', error);
    }
};

// Example usage
describeTrails();
getTrailStatus('your-trail-name'); // Replace 'your-trail-name' with the name of your trail
