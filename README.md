// How to run this app with all the necessary details ? 

1. Make sure you have Node.js and npm installed, you can check it in terminal with the command -> ( node -v )
2. Clone the repository with terminal command -> git clone <your-repo-url> | then go with command -> cd InventoryApp
3. Intall dependecies with -> npm install
4. Start the development server -> npm run dev ( Open your browser and go to http://localhost:3000 )
5. I have used a static JSON file with some data ( for inventory table ), since we're working in this mini app otherwise we should create databases and handle api calls etc ..
6. You can run some tests with -> npm test
7. Creating an optimized production build (this is for final step deployment) -> npm run build

For questions or feedback, contact: Gerald Muja – [geraldmuja13@example.com]






// How we can make this app more secure?

To ensure the security of our application, it is important to implement measures both on the backend and frontend. For the backend, if the app interacts with an API or database, authentication and authorization should be enforced using JWT or session tokens, along with role-based access control to differentiate privileges such as admin versus viewer. All API requests should use HTTPS to encrypt data in transit. API keys and sensitive URLs must be kept in .env files and never included in the source code to prevent accidental exposure.



// How would you make this solution scale to millions of records? //

Scaling this application to handle millions of records requires careful consideration of backend architecture, database design, and data fetching strategies. On the backend, using optimized databases such as PostgreSQL or MongoDB is essential, along with caching frequently accessed queries with tools like Redis to reduce database load.Additionally, API and data handling should be optimized by fetching data in batches instead of one large request, and using technologies like GraphQL to allow clients to request only the fields they need, minimizing data transfer and improving efficiency.
