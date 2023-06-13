## Tier 1: All Useres and Tasks (26/59)

<details>

### Frontend

#### User

  <details>

- [ ] Write a component to display a list of all users (at least their names and images)
- [ ] Write a users sub-reducer to manage users in your Redux store
- [ ] Display the all-users component when the url matches `/users`

  </details>

#### Tasks

  <details>

- [ ] Write a component to display a list of all tasks (at least their names)
- [ ] Write a tasks sub-reducer to manage tasks in your Redux store
- [ ] Display the all-tasks component when the url matches `/tasks`

  </details>

#### Navbar

  <details>

- [ ] Add a links to the navbar that can be used to navigate to the all-users view and the all-tasks view

  </details>

### Backend

#### Seed

  <details>

- [ ] Write a function which sync's and seeds your database when your application starts

  </details>

#### User

  <details>
  
  - [ ] Write a route to serve up all users

- Write a `users` model with the following information:
  - [ ] name - not empty or null
  - [ ] imageUrl - with a default value
  - [ ] address - not empty or null
  - [ ] description - extremely large text

  </details>

#### Tasks

  <details>
  
  - [ ] Write a route to serve up all tasks

- Write a `tasks` model with the following information:

  - [ ] firstName - not empty or null
  - [ ] lastName - not empty or null
  - [ ] email - not empty or null; must be a valid email
  - [ ] imageUrl - with a default value
  - [ ] gpa - decimal between 0.0 and 4.0

- [ ] Tasks may be associated with at most one user. Likewise, users may be associated with many tasks

  </details>

</details>

## Tier 2: Single Task and Single User (10/59)

<details>

### Frontend

<details>
  
#### Single User
  
  <details>
  
  - Write a component to display a single user with the following information:
    - [ ] The user's name, image, address and description
    - [ ] A list of the names of all tasks in that user (or a helpful message if it doesn't have any tasks)
  - [ ] Display the appropriate user's info when the url matches `/users/:userId`
  - [ ] Clicking on a user from the users view should navigate to show that user

- [ ] Clicking on the name of a task in the user view should navigate to show that task in the task view

  </details>

#### Single Tasks

<details>
  
  - Write a component to display a single task with the following information:
    - [ ] The task's full name, email, image, and gpa
    - [ ] The name of their user (or a helpful message if they don't have one)
  - [ ] Display the appropriate task when the url matches `/tasks/:taskId`
  - [ ] Clicking on a task from the tasks view should navigate to show that task

- [ ] Clicking on the name of a user in the task view should navigate to show that user in the user view

</details>

</details>

### Backend

<details>
  
#### User

<details>
  
   - [ ] Write a route to serve up a single task (based on their id), _including that task's user_
  
</details>

#### Tasks
  
<details>
  
   - [ ] Write a route to serve up a single user (based on its id), _including that users' tasks_
  
</details>

</details>
  
</details>
  
</details>

## Tier 3: Adding a User and Adding a Task (8/59)

<details>

### Frontend

<details>

#### User
  
  <details>
    
- [ ] Write a component to display a form for adding a new user that contains inputs for _at least_ the name and address.
- [ ] Display this component as part of the users view, alongside the list of users
    
- Submitting the form with a valid name/address should:
  - [ ] Make an AJAX request that causes the new user to be persisted in the database
  - [ ] Add the new user to the list of users without needing to refresh the page

  </details>
  
#### Task
  
  <details>
    
 - [ ] Write a component to display a form for adding a new task that contains inputs for _at least_ first name, last name and email
 - [ ] Display this component as part of the tasks view, alongside the list of tasks

 - Submitting the form with a valid first name/last name/email should:
   - [ ] Make an AJAX request that causes the new task to be persisted in the database
   - [ ] Add the new task to the list of tasks without needing to refresh the page
  
  </details>

</details>
  
### Backend
  
<details>
  
#### User
  
  <details>
  
  - [ ] Write a route to add a new user
    
  </details>
  
#### Task
  
  <details>
    
  - [ ] Write a route to add a new task
    
  </details>
  
 
</details>
  
</details>

## Tier 4: Removing a User and Removing a Task (6/59)

<details>
  
### Frontend

<details>

 #### User
  
  <details>
    
  - [ ] In the users view, include an `X` button next to each user
  - Clicking the `X` button should:

    - [ ] Make an AJAX request that causes that user to be removed from database
    - [ ] Remove the user from the list of users without needing to refresh the page
    
  </details>
  
 #### Task
  
  <details>
    
  - [ ] In the tasks view, include an `X` button next to each task
  - Clicking the `X` button should:
  
    - [ ] Make an AJAX request that causes that task to be removed from database
    - [ ] Remove the task from the list of tasks without needing to refresh the page

  
  </details>


</details>
  
### Backend

<details>
  
  #### User
  
  <details>
    
  - [ ] Write a route to remove a user (based on its id)
    
  </details>
  
  #### Task
  
  <details>
    
  - [ ] Write a route to remove a task (based on their id)
    
  </details>
  
</details>
  
</details>

## Tier 5: Updating a User and Updating a Task (9/59)

<details>

### Frontend

<details>

#### User
  
  <details>
  
  - [ ] Write a component to display a form updating _at least_ a user's name and address
  - [ ] Display this component as part of the user view
    - Submitting the form with valid data should:
  - [ ] Make an AJAX request that causes that user to be updated in the database
  - [ ] Update the user in the current view without needing to refresh the page
    - [ ] In the user view, display an `Unregister` button next to each of its tasks, which removes the task from the user (in the database as           well as this view); hint: the task is still in the database but is no longer associated with the user
    
  </details>

#### Task
  
  <details>
    
  - [ ] Write a component to display a form updating a task
  - [ ] Display this component as part of the task view
   - Submitting the form with valid data should:
  - [ ] Make an AJAX request that causes that task to be updated in the database
  - [ ] Update the task in the current view without needing to refresh the page
    
  </details>

</details>

### Backend

<details>
  
#### User
  
<details>
  
- [ ] Write a route to update an existing user
  
</details>

#### Task
  
<details>
  
- [ ] Write a route to update an existing task
  
</details>  
  
</details>
  
</details>

## Bonus Tier: Finishing Touches (15 EC)

<details>

#### Finishing Touches

<details>

- [ ] If a user attempts to add a new task or user without a required field, a helpful message should be displayed
- [ ] If a user attempts to access a page that doesn't exist (ex. `/potato`), a helpful "not found" message should be displayed
- [ ] If a user attempts to view a task/user that doesn't exist, a helpful message should be displayed
- [ ] Whenever a component needs to wait for data to load from the server, a "loading" message should be displayed until the data is available
- [ ] Overall, the app is spectacularly styled and visually stunning

</details>

#### Ordering

<details>

- [ ] Create option for tasks to be ordered based on lastName on all-tasks view
- [ ] Create option for tasks to be ordered based on GPA on all-tasks view
- [ ] Create option for users to be ordered based on number of assigned tasks on all-users view

</details>

#### Filtering

<details>

- [ ] Create a filter on all-tasks view to only show tasks who are not assigned to a user
- [ ] Create a filter on the all-users view to only show users that do not have any assigned tasks

</details>

#### Seeding & Pagination

<details>

- [ ] Seed 100+ tasks and 100+ users
- [ ] Implement _front-end_ pagination for the tasks view (e.g. `/tasks?page=1` renders the first ten tasks, and `/tasks?page=2` renders tasks 11-20)
- [ ] Implement _front-end_ pagination for the users view (e.g. `/users?page=1` renders the first ten users, and `/users?page=2` renders users 11-20)
- [ ] Implement _back-end_ pagination for tasks (e.g. `/api/tasks?page=1` returns the first ten tasks' data, and `/api/tasks?page=2` returns tasks 11-20)
- [ ] Implement _back-end_ pagination for users (e.g. `/api/users?page=1` returns the first ten users' data, and `/api/users?page=2` returns users 11-20)

</details>
  
</details>

- `RUBRIC.md` - contains the grading rubric for additional factors, as well as the formula for calculating the total score

## Evaluation

- Requirements score (70%)
- Rubric score (30%)
- Extra credit (15% max)
