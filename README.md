How to run your app with all the necessary details ? 

1. Make sure you have Node.js and npm installed, you can check it in terminal with the command -> ( node -v )
2. Clone the repository with terminal command -> git clone <your-repo-url> | then go with command -> cd InventoryApp
3. Intall dependecies with -> npm install
4. Start the development server -> npm run dev ( Open your browser and go to http://localhost:3000 )
5. I have used a static JSON file with some data ( for inventory table ), since we're working in this mini app otherwise we should create databases and handle api calls etc ..
6. You can run some tests with -> npm test
7. Creating an optimized production build (this is for final step deployment) -> npm run build


For questions or feedback, contact: Gerald Muja – [geraldmuja13@example.com]


How we can make this app more secure?

1. Secure the Backend (if applicable):
If our app fetches data from a backend API or database we should make: 

Authentication & Authorization: Use JWT or session tokens to restrict access to authorized users,
Role-based access control (e.g., admin vs. viewer).

HTTPS: Ensure all API requests go over HTTPS to encrypt data in transit.

2. Protect API Requests:
We should Keep API keys or sensitive URLs in .env files, never in source code.

3. Front-end Security:
Avoid storing sensitive data in localStorage, localStorage can be accessed by XSS attacks. Use session storage cautiously or secure cookies.

4. Minimize exposed endpoints:
Only fetch necessary data; avoid sending sensitive information to the client.



/* How would you make this solution scale to millions of records? */

Scaling this App to handle millions of records, requires thinking moslty about the backend, database and data fetching strategies.

1. Optimizing the backend with databases using PostgreSQL, MongoDB
2. Caching: Using Redis for frequently accessed queries to reduce database load.

3. Optimizing Front-end:
Use libraries like React Window or React Virtualized to render only visible rows.
This prevents the browser from crashing with millions of DOM element

4. Client-side Filtering / Sorting on limited data , perform filtering and sorting on small chunks, not the entire dataset.

5. API & Data Handling: 
Fetch data in batches instead of one large request.
GraphQL, allows clients to request only the fields they need, reducing data transfer.