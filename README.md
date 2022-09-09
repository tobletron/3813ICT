#Git Repository

Standard practice version control systems were used throughout the development of the first phase of the assignment. These practices include, initialisation of a local git repository, regular commits throughout the development of the project to the local repository, and the publishing of the local repository onto a public remote repository hosted on github. To ensure the changes made to the project throughout the entire development process, commit messages were designed to describe the changes made upon each commit. By doing this, if there was a scenario where a previous version of the project was required, it would be easier to understand both the state of the current version and reduce the number of changes between versions to select from. While these practices were implemented throughout the project, the project is an individual assignment, which simplifies the implementation of functionality as there is no need to merge several versions of code regularly. Nevertheless, by implementing these version control practices, there is always opportunity for project recovery in the case of file corruption, hardware damage, etc.

The git repository may be viewed at :

https://github.com/tobletron/Assignment


#Data Structures
Several data structures are used throughout the project on both the client side and the server side. These data structures include: 
-	Users
-	Groups
-	Channels
Each of the above are data structures that were defined and populated in the project by JSON files stored within the server side. A few sample objects have been populated in each file for testing purposes, however the final stage of the project should make use of the client side for further population of the data structures. In the following subsections, each data structure is described, its attributes defined, and the interaction with both the client and server side is outlined for both phase 1 and phase 2 of the assignment. 

##Users.json
The users.json file, stored on the server side of the project, defines a data structure for an object called ‘user’. A ‘user’ object stores information about the person interacting with the web application, and contains the following attributes:
1. Id -> an integer to be used as the unique identifier for each user
1. In phase 1 of the assignment, this value is added manually by editing the json file
1. 	Phase 2 of the assignment, this value will be automatically generated when creating new users on the client side
2. 	Username -> a string containing the username for login purposes
2.	In phase 1 of the assignment, this value is added manually by editing the json file
2. 	In phase 2 of the assignment, this value will be determined by the SuperAdmin adding a user on the client side 
3.	Password -> a string containing the password for login purposes
3.	In phase 1 of the assignment, this value is added manually by editing the json file
3.	In phase 2 of the assignment, this value will be determined by the SuperAdmin adding a user on the client side 

4.	Email -> a string containing the address of the user for contact 
4.	In phase 1 of the assignment, this value is added manually by editing the json file
4.	In phase 2 of the assignment, this value will be determined by the SuperAdmin adding a user on the client side 
5.	Role -> a string that defines the level of privileges the user has access to 
5.	In phase 1 of the assignment, this value is added manually by editing the json file
5.	In phase 2 of the assignment, this value will be ‘Member’ by default, but can be modified when granted additional privileges by an admin user

##Groups.json
The groups.json file, stored on the server side of the project, defines a data structure for an object called ‘group’. A ‘group’ object stores information that uniquely identifies a section of the application. The object contains the following attributes:
1.  Id -> an integer to be used as the unique identifier for each group
1.	In phase 1 of the assignment, this value is added manually by editing the json file
1.	Phase 2 of the assignment, this value will be automatically generated when creating new groups on the client side
2.	Name -> a string that is used for display on the client side, so the user knows what the groups ‘subject’ is
2.	In phase 1 of the assignment, this value is added manually by editing the json file
2.	Phase 2 of the assignment, this value will be given by the group admin or super admin that creates it on the client side
3.	Capacity -> An integer that defines the largest number allowed for users to join the group
3.	In phase 1 of the assignment, this value is added manually by editing the json file
3.	Phase 2 of the assignment, this value will be given by the group admin or super admin that creates it on the client side
4.	Members -> An array of integers that refer to the ‘id’ attribute of user objects. This defines the users that have access to the group
4.	In phase 1 of the assignment, this value is added manually by editing the json file
4.	In phase 2 of the assignment, this array will be altered on the client side when admins add/remove users to and from groups. 

##Channels.json
The channels.json file, stored on the server side for the project, defines a data structure for an object called ‘channel’. A ‘channel’ object stores information that uniquely identifies a subsection within the application. A channel object belongs within a single group, and a group may contain several channels. The interaction between these data structures, and definitions of its attributes follows.
1.	Id -> An integer that uniquely identifies each channel.
1.	In phase 1 of the assignment, this value is added manually by editing the json file
1.	Phase 2 of the assignment, this value will be automatically generated when creating new channels on the client side
2.	GroupID -> An integer that refers to the ‘id’ attribute of a group object. This is the attribute that defines which group the channel belongs to, and therefore which users have access to it (see figure 1). 
2.	In phase 1 of the assignment, this value is added manually by editing the json file directly
2.	In phase 2 of the assignment, this value is determined by the location of the admin within the application at the time of creating a new channel on the client side 
3.	Name -> a string that is used for display on the client side, so the user knows what the channels ‘chatroom’ is titled
3.	In phase 1 of the assignment, this value is added manually by editing the json file
3.	Phase 2 of the assignment, this value will be given by the group admin or super admin or channel admin that creates it on the client side

#Angular Architecture
The client side of the project is implemented using angular, consisting of a hierarchy of components, modules, services, and routes. Angular builds website under a single view, where the contents of the screen at any given time is determined by the root html page that contains a router link (dynamically changing view based on user interaction). At the top level, the index.html file contains a link to the app-root template, which is defined in the app component of the project. This app component is what is always displayed on the screen for the user, and parts of this change based on the angular router. 

Each component in angular consists of several files that communicate with each other. A template file, or ‘html’ file, uses the markup language to define the elements to display. Angular functions and variables are defined in the ‘component’ file using typescript and are available for use in the template file. Finally, the CSS file provides the browser with information about styling to change the appearance of elements within the template file. This relationship is repeated across all components within the project. 

Routes are used to determine which of the components should be employed at any given time. Routes can be linked within components on the client side, used mostly for basic webpage navigation. Routes may also be used to communicate with the server, for the purpose of obtaining or receiving data stored there. 


#Server-Side Routes/Parameters/Return Values
On the server side, routes are used to get, post, delete or patch data stored in JSON objects. In phase 1 of the assignment, several routes are used for this purpose, and are described below. 

##Route 1: server homepage to test functionality

`app.get("/", (req, res) => {
    res.send("server is working");
  });`

App.get() calls an express function that takes two parameters. The first is the url that triggers the route, and the second defines a promise to the response or result of the route. By passing “/” as the first parameter, the route is invoked when the root url of the server is opened. The return value of the route is to send the string “server is working”, alerting the developer that the server is operational. 

##Route 2: User authentication route

`app.post("/api/auth", (req, res) => {
    var user_data = users.find((user) => user.username == req.body.username && user.password == req.body.password);
    //console.log(user_data);
    if (user_data){ //if the user is valid
        res.send(user_data);
        console.log("user logged in: " + user_data.username);
    }
});`

App.post is similar to the route described above, but in this case infers some insertion of data. The url used to invoke the route is “/api/auth”, which can be attached to any angular page by calling it from a ‘fetch’ function in a component. This function returns a promise that is resolved by the response from the route. The route reads the json object ‘users.json’, and finds the user object that matches the conditions given. Upon finding the user object, the object is sent as a response to the fetch call, resolving the promise. 

##Route 3: Group Fetch Route

`app.post("/api/group", (req, res) => {
  var group_data = groups.find((group) => group.id == req.body.groupID);
  console.log("here");
  if (group_data) { 
    res.send(group_data);
  }
});`

Similarly to the route described above, this route is called within a fetch() method in an angular component. Upon making the call to the “/api/group” url, the route is passed an integer ‘groupID’, and the route searches the ‘groups.json’ file for a group that matches the group id given. This is passed back into the angular component as a return value. 
