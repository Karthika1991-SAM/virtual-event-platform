const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app'); // Update this path if necessary

describe('Event Management Endpoints', () => {
    let attendeeToken;

    beforeAll(() => {
        // Generate a valid token for an attendee
        attendeeToken = jwt.sign(
            { id: 'attendeeId123', role: 'attendee' },
            process.env.JWT_SECRET
        );
    });

    test('Attendee should not create an event', async () => {
        const res = await request(app)
            .post('/events') // Ensure this matches your endpoint path
            .set('Authorization', `Bearer ${attendeeToken}`)
            .send({
                title: 'Unauthorized Event',
                description: 'Unauthorized Attempt',
            });

        // Check the response
        expect(res.statusCode).toEqual(403); // Expect forbidden status
        expect(res.body.message).toBe('Only organizers can create events');
    });
});
