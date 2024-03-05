import { test, expect } from '@playwright/test';
import { ok } from 'assert';
import petRequestBody from './requestBody/requestBody';
import petRequestBodyUpdated from './requestBody/requestBodyUpdated';

const verifyPetNameAddedSuccessfully = async (request, petId, expectedPetName) => {
    const response = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
    expect(response.status()).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse.name).toBe(expectedPetName);
};

/* idea of the tests is to cover post > get, update > get and finally delete > get to run 
and verify the api functionality*/

//Post > Get tests
test('POST: Add a pet', async ({ request }) => {
    const response = await request.post('https://petstore.swagger.io/v2/pet', {data:petRequestBody});
    expect(response.status()).toBe(200);
})

//verify the petname has been added successfully
test('API get request verification', async ({ request }) => {
    await verifyPetNameAddedSuccessfully(request, 666, 'Snowie');
});

//update > get tests
test('Update the pet', async ({ request }) => {
    const response = await request.put('https://petstore.swagger.io/v2/pet', {data: petRequestBodyUpdated});
    //reponsecode check
    expect(response.status()).toBe(200);
})
//Verify the pet name, Id is updated
test('API get Updated request verification', async ({ request }) => {
    await verifyPetNameAddedSuccessfully(request, 666666, 'Snowie');
});

//delete pet from the store and verify
test('API delete pet request', async ({ request }) => {
    const response = await request.delete('https://petstore.swagger.io/v2/pet/666666');
    expect(response.status()).toBe(200);
})

test('API get after del request', async ({ request }) => {
    const response = await request.get('https://petstore.swagger.io/v2/pet/666666');
    expect(response.status()).toBe(404);
})