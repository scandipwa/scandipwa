# Redux

This application uses [Redux](https://redux.js.org/) as global state container.

## Schema (how it works?)

                        +-------------+
          1 user input  |             |
       +----------------> A Component |
                        |             |
                        +-+---------^-+
                          |         |
         2 State changing |         | 8 Container updates
         user interaction |         | props of child component
                          |         |
                 +--------v---------+-----+
                 |                        |
            +---->      B Container       |
            |    |                        |                  +-------------------------------+
            |    |    Is action result    |                  |                               |
            |    |      synchronous?      |                  |  E Utility / Helper function  |
            |    |                        |                  |                               |
            |    +--+------------------+--+                  +------------------^----------+-+
            |       |                  |                                        |          |
            |     Y |                N | 3 Payload is passed to                 |          |
            |     E |                O | asynchronous action dispatcher         |          |
            |     S |                  |                                        |          |
            |       |     +------------v----------+    4 Helpers are invoked    |          |
            |       |     |                       +-----------------------------+          |
            |       |     |  C Action Dispatcher  |                                        |
            |       |     |                       <----------------------------------------+
            |       |     +--+--------------------+   5 Asynchronous response is returned
            |       |        |
            |       |        |
            |       |        |                   +--------------------+
            |       |        |                   |                    |
            |       +--------v------------------->  D Action Reducer  +----+
            |           6 Action is dispatched   |                    |    |
            |                                    +--------------------+    |
            |                                                              |
            +--------------------------------------------------------------+
                        7 Action result updates the state

## Involved parts:

- **A** – Component, NC: `Feature.component.js` – implements the data display functional

- **B** – Container, NC: `Feature.container.js` – relates the component with Redux global state

- _unmentioned_ – Action Declaration, NC: `Feature.action.js` – declare action interface (arguments and returned values)

- **C** – Action Dispatcher, NC: `Feature.dispatcher.js` – dispatches the Redux global state actions

- **D** – Action Reducer, NC: `Feature.reducer.js` – handles the state update, applies Redux action results to global state

- **E** – Utility / Helper function, NC: `Helper.js` – utility functional which implements the common logic

*NC – Naming convention

## Data pass through:

1. User input (`User -> A`)

2. Global state changing user interaction (`A -> B`)

3. Event payload is passed to asynchronous action dispatcher (`B -> C`)

4. Helpers are invoked (`C -> E`)

5. Asynchronous response is returned from helper (`E -> C`)

6. Action is dispatched (`C -> D`, `B -> D`)

7. Action result updates the state (`D -> B`)

8. Container updates props of child component (`B -> A`)

## Tools

There is a [browser extension](https://github.com/reduxjs/redux-devtools) for Redux debugging. For it work, application has to be run in `development` mode.
