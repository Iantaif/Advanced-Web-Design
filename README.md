# eg04
ReactJS:
ReactJS is a library enabling developers to create maintainable web apps by decomposing them into smaller, manageable UI parts represented as React Components.
Product Management app:
The Product Management app is a simple application for displaying and filtering products.
Each product has properties like:
- Name
- Category
- Price (in $)
- Availability status (in stock or out of stock).

By default, all products are displayed. Users can filter to view only available products by:
- Checking a checkbox.
- Search for products by name at the search box. Support partial text search.

Here is the Product app UI (Links to an external site.)
Requirement
- Implement Product Management app using ReactJS.
- No additional Library is required.
- No need to store the data or call the API.
- No need to build the beautiful UI
- The code should be readable, and folder is well-structured
Suggestion
- Using ReactJS pure component to build smaller component
- Using ReactJS event to implement search product
- Using React Prop and State to passing data into child component
- Declare a constant to hold the product list value:

const PRODUCTS = [
{category: "Fruits", price: "$1", stocked: true, name: "Apple"},
{category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
{category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
{category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
{category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
{category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];