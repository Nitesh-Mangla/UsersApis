# Project name
User Apis

# Description
Project will able to get user listing with pagination, filter by user name and email

# Project Requirements Packages
node js
postgres

# Install postgres on different environment

Using Homebrew
1. install homebrew - 
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
2. install postgres - 
   brew install postgresql
3. Start service - 
   brew services start postgresql
4. Create database in postgres - 
   createdb mydatabase
5. Enter in created database - 
   psql mydatabase

Using Ubuntu
1. Install Postgres - 
   sudo apt-get install postgresql
2. Start Service - 
   sudo service postgresql start
3. Create Database - 
   createdb mydatabase -O myuser
4. Enter in created database -
   psql mydatabase -U myuser

# Changes in .env
1. changes db credential as per requirement
2. set table name in entities/User.js (default is user_details) 

# Install Project Packages
```
npm install
```

# Start Server
```
nodemon server.js

```

# To Test User List Apis
use end-point "api-docs"

