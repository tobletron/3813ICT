 # Software Frameworks Assignment Phase 2

>_Toby Murfet_ | _S5136396_ _|_ _Griffith University_ 

## How to Run Application

The application may be viewed and tested by following these steps:

1. Download zip file
2. Unzip files
3. In a terminal, navigate to the server folder
4. Run the following command:
    node server.js
5. In another terminal, navigate to the src folder
6. Run the following command:
    ng serve
7. In a browser, go to (http://localhost:4200)

## Git Repository

The git repository may be viewed at :

[Github - tobletron](https://github.com/tobletron/3813ICT)

Standard practice version control systems were used throughout the development assignment. These practices include, initialisation of a local git repository, regular commits throughout the development of the project to the local repository, and the publishing of the local repository onto a public remote repository hosted on github. To ensure the changes made to the project throughout the entire development process, commit messages were designed to describe the changes made upon each commit. While these practices were implemented throughout the project, the project is an individual assignment, which simplifies the implementation of functionality as there is no need to merge several versions of code regularly. Nevertheless, by implementing these version control practices, there is always opportunity for project recovery in the case of file corruption, hardware damage, etc.

## Data Structures

Several data structures are used throughout the project, including:

- Users
- Groups
- Channels
- Chat History

Each of the above data structures are used within a *MongoDB* database, using get and post requests in routes throughout the application. In the following subsections, each data structure is described, its attributes defined, and the interaction with both the client and server side is outlined for both phase 1 and phase 2 of the assignment.

### Users

The name *users* refers to the data that represents the details of users of the website. This data is stored in the database, and CRUD operations may be applied to manipulate the data. The following table outlines how a *user* is represented in data form:

| **Identifier** | **Data type** | **Example** |
| --- | --- | --- |
| \_id | ObjectId | 6334d75491d6e645d8bd444b |
| Username | String | super |
| Email | String | super@gmail.com |
| Password | Number | 123 |
| Role | string | SuperAdmin |

> The above example user demonstrated as an object:


    {
      "_id": {
        "$oid": "6334d75491d6e645d8bd444b"
      },
      "username": "super",
      "email": "super@gmail.com",
      "password": 123,
      "role": "SuperAdmin"
    }


### Groups

The name 'groups' refers to the data that represents the details of groups of the website. This data is stored in the database, and CRUD operations may be applied to manipulate the data. The following tables outlines how a 'group' is represented in data form:

| **Identifier** | **Data type** | **Example** |
| --- | --- | --- |
| \_id | ObjectID | 633a7ca84ea4ef559b8c94c1 |
| Title | String | Movies |
| Members | String array | member, groupadmin, super |

> The above example group demonstrated as an object:

    {
      "_id": {
        "$oid": "633a7ca84ea4ef559b8c94c1"
      },
      "title": "Movies",
      "members": [
        "member",
        "super",
        "groupadmin"
      ]
    }


### Channels

The name 'channels' refers to the data that represents the details of channels of the website. This data is stored in the database, and CRUD operations may be applied to manipulate the data. The following tables outlines how a 'channel' is represented in data form:

| **Identifier** | **Data type** | **Example** |
| --- | --- | --- |
| \_id | ObjectID | 63465c88d20d3e63fc4246fb |
| Title | String | Action Movies |
| GroupName | String | Movies |
| Members | String array | member, super

> The above example channel demonstrated as an object:

    {
      "_id": {
        "$oid": "63465c88d20d3e63fc4246fb"
      },
      "title": "Action Movies",
      "groupName": "Movies",
      "members": [
        "member",
        "super"
      ]
    }

### Chat History

The name 'chat history' refers to the data that represents the details of chat history of the website. This data is stored in the database, and CRUD operations may be applied to manipulate the data. The following tables outlines how 'chat history' is represented in data form:

| **Identifier** | **Data type** | **Example** |
| --- | --- | --- |
| \_id | ObjectID | 63465ca6d20d3e63fc424701 |
| Channel | String | Action Movies |
| Chats | String array | member at 16:20 - Hi super!

> The above example history demonstrated as an object:

    {
      "_id": {
        "$oid": "63465ca6d20d3e63fc424701"
      },
      "channel": "Action Movies",
      "chats": [
        "member at 16:20 - Hi super!"
      ]
    }

## REST API

The applications front end communicates with the backend using a REST API. This consists of several routes, that pass data as parameters to control database operations. Below is a table that outlines each of the routes, its parameters, return types, and a description of the purpose of the route.

| **Route** | **Parameters** | **Return Types** | **Description** |
| --- | --- | --- | --- |
| **/login** | (string, string) | Bool | The login route is used to submit the user login data to the database, and return true if the data matches. |
| **/getUsers** | None | [Object] | The get users route is used to retrieve an array of user objects from the database. |
| **/deleteUser** | (string) | Bool | The delete user route is used to request that the server delete a user from the database, using the username as a reference for which user to delete. Returns true if no errors are encountered. |
| **/insertUser** | (string, string, number, string) | Bool | The purpose of this route is to create a new user and publish it to the database. The server does some validation checks on parameters, and also checks whether or not the user already exists before performing the post request. Returns true if successful. |
| **/insertgroup** | (string, number, [string]) | Bool | The purpose of this route is to create a new group and publish it to the database. The server checks if the group already exists, and then performs the post request. Returns true if successful. |
| **/getGroups** | None | [Object] | The purpose of this route is to retrive an array of group objects from the database. Returns an array of objects to the frontend. |
| **/deleteGroup** | (string) | Bool | The purpose of this route is to delete a group from the database. The server accepts the name of the group as a string, and performs the post request, returning true if successful. |
| **/updateGroup** | (object, object) | Object | The purpose of this route is to change the values of an already existing group. The servers accepts an object that represents the data of the group currently in the database, and another object that will replace the existing one. Returns the updated object. |
| **/insertChannel** | (string, string, [string]) | Bool | The purpose of this route is to create a new channel and publish it to the database. The server accepts the values for the new database, and after checking that the channel does not yet already exist, performs the post request, returning true if successful. |
| **/getChannels** | None | [Object] | The purpose of this route is to retrieve a list of all channels in the database. Returns an array of objects representing the channels. |
| **/deleteChannel** | (string) | Bool | The purpose of this route is to delete an existing channel from the database. The server accepts the name of the database to delete as a string, and performs the delete request, returning true if successful. |
| **/getChatHistory** | None | [Object] | The purpose of this route is to retrieve a list of all chat history that exists in the database. Returns an array of objects that represent the chat history. |
| **/insertChatHistory** | (string, [string]) | Bool | The purpose of this route is to add the chat from the frontend into the database. The server accepts the name of the channel and an array of the chat history, performs the post request, and returns true if successful. |
| **/deleteChatHistory** | (string) | Bool | The purpose of this route is to delete chat history of a channel on the front end from the database. The server accepts the name of the channel, checks if chat history exists for that channel, and then deletes it from the database. Returns true if successful. |

## Angular Architecture

The client side of the project is implemented using angular, consisting of a hierarchy of components, modules, services, and routes. Angular builds website under a single view, where the contents of the screen at any given time is determined by the root html page that contains a router link (dynamically changing view based on user interaction). At the top level, the index.html file contains a link to the app-root template, which is defined in the app component of the project. This app component is what is always displayed on the screen for the user, and parts of this change based on the angular router.

Each component in angular consists of several files that communicate with each other. A template file, or 'html' file, uses the markup language to define the elements to display. Angular functions and variables are defined in the 'component' file using typescript and are available for use in the template file. Finally, the CSS file provides the browser with information about styling to change the appearance of elements within the template file. This relationship is repeated across all components within the project.

Each of the components (generated using the *ng generate component* command) used in the assignment are listed below: 
> App

> Login

> Account

> Admin

> Group

> Admin-Group

> Channel

>Admin-Channel

Routes are used to determine which of the components should be employed at any given time. Routes can be linked within components on the client side, used mostly for basic webpage navigation. Routes may also be used to communicate with the server, for the purpose of obtaining or receiving data stored there (via a database).

## Permissions Table

The below table illustrates the level of admin permissions each user role has.

|                                 | Member     | Group Assistant     | Group Admin     | Super Admin     |
|-----------------------------    |:------:    |:---------------:    |:-----------:    |:-----------:    |
| **USER OPERATIONS**             |            |                     |                 |                 |
| Create Users                    |    ✗       |        ✗            |      ✓          |      ✓          |
| Delete Users                    |    ✗       |        ✗            |      ✗          |      ✓          |
| Upgrade User to SuperAdmin      |    ✗       |        ✗            |      ✗          |      ✓          |
| Upgrade User to GroupAdmin      |    ✗       |        ✗            |      ✗          |      ✓          |
| Upgrade User to GroupAssist     |    ✗       |        ✗            |      ✓          |      ✓          |
| **GROUP OPERATIONS**            |            |                     |                 |                 |
| Create Group                    |    ✗       |        ✗            |      ✓          |      ✓          |
| Remove Group                    |    ✗       |        ✗            |      ✓          |      ✓          |
| Invite User to Group            |    ✗       |        ✗            |      ✓          |      ✓          |
| Remove User from Group          |    ✗       |        ✗            |      ✓          |      ✓          |
| **CHANNEL OPERATIONS**          |            |                     |                 |                 |
| Remove Channel                  |    ✗       |        ✗            |      ✓          |      ✓          |
| Invite User to Channel          |    ✗       |        ✓            |      ✓          |      ✓          |
| Create Channel                  |    ✗       |        ✓            |      ✓          |      ✓          |
| Remove User from Channel        |    ✗       |        ✓            |      ✓          |      ✓          |

