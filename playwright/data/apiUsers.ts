export const generateNewUser = () => {

    const timestamp = Date.now();

    return {
        name: `QA Tester ${timestamp}`,
        email: `qa.tester.${timestamp}@example.com`,
        password: 'Test@1234',
        title: 'Mr',
        birth_date: '15',
        birth_month: '6',
        birth_year: '1995',
        firstname: 'QA',
        lastname: 'Tester',
        company: 'Fintech Sdn Bhd',
        address1: '123 Automation Street',
        address2: 'Unit 4B',
        country: 'Turkey',
        zipcode: '35210',
        state: 'Izmir',
        city: 'Izmir',
        mobile_number: '5456789012',
    };

};

export const invalidUser = {
    email: 'not.a.real.user@example.com',
    password: 'wrong-password',
};
