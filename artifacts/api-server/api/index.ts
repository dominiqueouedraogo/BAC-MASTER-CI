import { createServer } from 'vercel-node-server';
import { app } from './app'; // Adjust the import based on your app's structure

// This flag ensures initialization seeding runs only once
let isInitialized = false;

const initSeeding = () => {
    if (!isInitialized) {
        // Initialization logic
        console.log('Initialization seeding is running...');
        // Example of initialization code
        // ...
        isInitialized = true;
    }
};

const server = createServer(async (req, res) => {
    initSeeding();
    await app(req, res);
});

export default server;
