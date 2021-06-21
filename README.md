# Todo Frontend 

To get started you need to run first install the dependencies

    npm install


Second step is add environment variables:
    
    move '.\rename for testing.env' .env.development

For OSX/Unix:
    
    mv "./rename for testing.env" .env.development

Finally to test watchmode: 

    npm run start:dev

    //windows
    explorer http://localhost:3000

    //mac
    open http://localhost:3000

To run in production:

    //process.env.CORS_ORIGIN must be the domain url that the user visits. Exact syntax http[s]://domain.com:<port>
    
    npm run build
    npm run start:prod


