# footprint

A personal carbon emissions calculator.

## footprint-api

The API is written in Python with [FastAPI](https://fastapi.tiangolo.com/) and deployed through [Deta](https://docs.deta.sh/docs/home/).

The API provides the calculator with the structure of the categories and emissions factors, effectively making the web app's UI data-driven. To see this in action, you can alter the `categories` data structure in `main.py` and run `deta deploy` to deploy the changed API and see the resulting web app.

Endpoint documentation can be found [here](https://lh2lo0.deta.dev/docs#/).

Some simple tests are included via `pytest`.

## footprint-web

The web application is written with React and uses Ant Design components.

To run:

1. Clone the repository and `cd` into the directory
2. Run `yarn install`
3. Run `yarn start`

The basic layout contains emission categories on the left side and the selected category's emission types in the main content window. Entering values in each emission type's input field will automatically update the total emissions displayed at the bottom of the page (see note in `App.js` for a known issue with this feature).

As mentioned above, the web app's content is driven by the API.

There are some simple snapshot tests for all the components. Testing coverage could be expanded to more e2e-type tests like: 

1. inputting values and asserting that the correct changes to the "Totel Emissions" footer are performed
2. selecting a category and asserting that the newly-selected category's emission types are displayed in the content pane
