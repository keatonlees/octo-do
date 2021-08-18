# Octo-Do

[Octo-do](https://octo-do.herokuapp.com/) is a fun and flexible web-based to-do list application that allows a user to create, edit and delete tasks as well as offering them the flexibility to move tasks into a daily list. 

## The process
### Developed using
- React
- CSS
- Node.js
- Axios
- MySQL
- Heroku

### Inspirations and goals
My inspiration for Octo-Do came from the fact that I had a very specific way of organizing my to-do lists. Previously, I had used various alternatives including TickTick and Notion, but neither application provided the fuctionality I was looking for. Since I could not find the exact functionality I was looking for, I decided to learn and develop my own web application. 

My goal for the web application was to eventually replace my current to-do list application as my daily driver. I wanted to have something that I could use for school, work and any other tasks I had in mind. There would be two sides to the application, an overall task side and a daily task side. In the overall tasks side, a user would be able to create, edit and delete any tasks they had. They would also be able to drag a task from the overall side to the daily tasks side to plan out what they wanted to do during the day. This was the process I had been doing very tediously using other alternatives.

### Designing and developing the application
When deciding what technologies and languages I wanted to use for this project, I would need a frontend, backend and database all preferably hosted in the same location. This is why I decided to use Heroku, as it allowed me to host a React application, with a Node.js backend and offered MySQL database storage all through Heroku. I chose React for its modularity and .map() functionality. I chose Node.js as I was already using Javascript and I believed it was a better fit than an alternative such as Flask, which seems to have more problems when deploying to Heroku. Although Heroku natively supports PostgreSQL, from working with it previously, there were many complications when trying to create and view tables externally. This is why I chose to use Heroku's ClearDB add-on for MySQL.

## Future fixes, updates and additions
