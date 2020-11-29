# React-Express-Postgre App

## Application Architecture

![Alt text here](/public/Architecture.svg)

## Running the application and seeding demo data

Please clone the repo and run the following:
```
npm install 
npm start
```

This will create a employeedb database with employees table. When the application first launches, we will need to seed the database with demo data:

```
cd server
npx sequelize-cli db:seed:all
```

The application now should be running at `http://localhost:3000/` and the table should be rendered with the demo data. (You may need to refresh the application)

## Server Application

The server side application consists of `express` for API handling, `sequelize` as `ORM` and `postgres` for data management. 
While designing the backend, the main focus initially was to get the database configured and the web server connected to it.
Once the connectivity was established we intialize `Sequelize` for the type of data we want to store datatypes and define the `Model`. 

Next we create the `controllers` to handle our `crud` functions using the sequelize `interface` like `create`, `delete`, `update` `findAll`, `findByPk`.
Finally we create the `endpoints` in `routes` that the `http` client will connect to send `requests` and determine their appropriate `response`. 

Next we create some demo data in a file and define the seeders to populate the database with that data. Once we have all the components in place, we test the routes by sending the requests in `Postman`.

## Client Application

The client application consists of `react`, `axios` as http client, `react-table` to render the data in a tabular format and `material-ui` for styling the application. 
First we initialize `axios` in `http-client.js` with the base Url for the backend and the headers. Next we create an `employeeService` that defines all the endpoints to perform the crud operations.

We are using the `functional component` to leverage `hooks` for state management. we make sure the application is able to fetch the data from the backend. Once the data has been fetched we render the data in the `EmployeeTable` component. 

All the functions for manipulating data are handled in the `EmployeeTableContainer` and passed to the component as props. Here we also define the table columns and their `accessors` for the `delete` and `edit` columns. 
We can use the `EmployeeForm` to either `add` a new employee or `update` an existing employee information. Every time a request is sent to the backend server, the `table` will re-render with `useEffect` hook to give feedback of the action performed.
