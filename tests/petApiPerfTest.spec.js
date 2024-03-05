import { test, expect } from '@playwright/test';
import petRequestBody from './requestBody/requestBody';

const getRequest = async (request, petId, expectedPetName) => {
    const response = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
    expect(response.status()).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse.name).toBe(expectedPetName);
};

// Define a function to measure performance
const measurePerformance = async (request, fn) => {
    const startTime = Date.now();
    await fn(request);
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const maxResponseTime = 1000; // 1 second (adjust as needed)
    expect(responseTime).toBeLessThanOrEqual(maxResponseTime); // Assert performance
};

// Post > Get tests
test('POST: Add a pet', async ({ request }) => {
    const response = await request.post('https://petstore.swagger.io/v2/pet', { data: petRequestBody });
    expect(response.status()).toBe(200);
});

// Performance test for verifying the pet name has been added successfully
test('API get request verification with performance', async ({ request }) => {
    await measurePerformance(request, async (request) => {
        await getRequest(request, 666, 'Snowie');
    });
});