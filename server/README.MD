run postgresql 
brew services start postgresql

stop:
brew services start postgresql

https://medium.com/@viviennediegoencarnacion/getting-started-with-postgresql-on-mac-e6a5f48ee399#:~:text=%60psql%60%20on%20Terminal,postgresql)%20%2C%20then%20run%20psql%20.

https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize

https://github.com/didinj/node-express-postgresql-sequelize/blob/master/models/classroom.js

https://www.elephantsql.com/plans.html

https://dataschool.com/learn-sql/how-to-start-a-postgresql-server-on-mac-os-x/

https://dev.to/miku86/nodejs-postgresql-how-to-connect-our-database-to-our-simple-express-server-with-an-orm-gcm


https://www.codementor.io/@mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3

NOTE: We could include the image url when grabbing the users, but that slows down the JSON fetch. Instead, set up the route and query it from there

Send emails too? could be good

CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, token TEXT)
INSERT INTO users(name, email, password) VALUES ('Hugh Jackman', 'jackman@xmen.com', 'swordfish' )
