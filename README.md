# ChatApp

## Installation Guide
1. Clone the repo in your local.
2. Go inside the webapp-server directory and perform
    ```bash
    npm i
    ```
3. Setup your local mongoDb or Atlas
4. Setup the .env file as specified in .env.example
5. Ran the seed file by the following commands
    ```bash
    npm data:import

    # to insert the data
    ```
    ```bash
    npm data:destroy

    # to delete the data
    ```
    Now, you can see dummy data are populated in the database for all the 3 collections

6. Now, start the server by following command
    ```bash
    npm run dev
    ```


## For SwaggerDoc
In browser, head over to
    ```
    http://localhost:[PORT]/api-docs
    ```
Firstly do the login via guest login credentials. Token will be generated in the response. Copy the token, click onto the Authorize button shown on the top right corner and paste it. This way you can access the protected routes.