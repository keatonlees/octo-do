# Octo-Do

Octo-do is a fun and flexible web-based to-do list application that allows a user to create, edit and delete tasks as well as offering them the flexibility to move tasks into a daily list. 

## The process
### Developed using
- React
- CSS
- Node.js
- Axios
- MySQL
- Heroku

### Inspirations and goals
The inspiration for Octo-Do came from the fact that there was a need for a specific way of organizing tasks. Previous organizational apps included TickTick and Notion, but neither application provided the wanted functionality. Since the functionality wasn't able to be found, Octo-Do was developed. 

The goal for the web application was to combine alternative to-do app features to create a new to-do web application; the to-do functionality should be able to be used for all aspects including school, work and any other fields. There would be two sides to the application, an overall task side and a daily task side. In the overall tasks side, a user would be able to create, edit and delete any tasks they had. They would also be able to drag a task from the overall side to the daily tasks side to plan out what they wanted to do during the day. 

### Designing and developing the application
When deciding what technologies and languages I wanted to use for this project, I would need a frontend, backend and database all preferably hosted in the same location. This is why I decided to use Heroku, as it allowed me to host a React application, with a Node.js backend and offered MySQL database storage all through Heroku. I chose React for its modularity and .map() functionality. I chose Node.js and Axios as I was already using Javascript and I believed it was a better fit than an alternative such as Flask, which seems to have more problems when deploying to Heroku. Although Heroku natively supports PostgreSQL, from working with it previously, there were many complications when trying to create and view tables externally. This is why I chose to use Heroku's ClearDB add-on for MySQL. 

There were many steps in the process when developing this application. I first had to expand my knowledge of React to include both react-router-dom and react-beautiful-dnd libraries. The react-beautiful-dnd library looked straightforward at first, but ended up being a very complicated library to work with. It was very tricky to correctly assign each "droppable" area and "draggable" object. It took about 3 weeks to fully have a working prototype with two independent sides with areas that I could drag and drop items to. 

The next step I implemented was retrieving and mapping the objects from the database. This was a slow process as I tried many different methods to .map() the data efficiently and quickly as I was limited in the speed of Heroku's free tier of ClearDB. My final implementation is not perfect as there is a slight delay between dropping an item and it registering that in the database, but I believe is the most efficient way to retrieve and .map() the data given my current limitations. 

## Future fixes, updates and additions
For the future, there a various bugs that may need attention and new features that may be added:
1. As mentioned above, the speed at which the data is retreived is not as fast as it could be. However, in order to solve this issue, I would have to upgrade the Heroku database add-on plan as I believe this is the limiting factor.
2. There should be more customization for the user for different settings. This could include allowing a user to choose what time their day starts and ends at, what their default due date and time is, etc. This would be done through the "My Account" tab in the top right. Currently, there is only an option to change a user's display name.
3. Possibly sometime in the future, Octo-Do would benefit from having a mobile app that would sync with the desktop web application. As of this moment, the mobile view of the web application is hard to read and use.
