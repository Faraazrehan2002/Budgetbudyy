# Budgetbudyy

Budgetbudyy is a simple web application to manage a list of budget items. The application allows users to add, remove, edit, filter, and clear items. This project is built with vanilla JavaScript and utilizes localStorage for data persistence.

## Features

- Add new budget items.
- Edit existing budget items.
- Remove individual budget items.
- Clear all budget items.
- Filter budget items based on user input.
- Persistent storage using localStorage.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/budgetbudyy.git
   ```

2. Navigate to the project directory:
   ```bash
   cd budgetbudyy
   ```

3. Open the `index.html` file in your favorite web browser to run the application.

## Usage

### Adding an Item
1. Type the item name into the input field.
2. Click the "Add Item" button or press "Enter" to add the item to the list.

### Editing an Item
1. Click on the item you wish to edit.
2. The item will be highlighted and its text will appear in the input field.
3. Make the desired changes and click the "Update Item" button or press "Enter" to save the changes.

### Removing an Item
1. Click the remove button (X icon) next to the item you wish to remove.
2. Confirm the removal when prompted.

### Clearing All Items
1. Click the "Clear All" button.
2. Confirm the action when prompted.

### Filtering Items
1. Type into the filter input to display items that match the entered text.

## Code Overview

The main functionality is provided by the `script.js` file. Here's a brief overview of the key functions and their roles:

### Functions

- `displayItemsOnPage()`: Fetches items from localStorage and displays them on the page.
- `onaddItemSubmit(e)`: Handles the addition of new items and updating of existing items.
- `addItemtoDOM(item)`: Adds a new item to the DOM.
- `createButton(classes)`: Creates a button element with specified classes.
- `createIcon(classes)`: Creates an icon element with specified classes.
- `addItemtoStorage(item)`: Adds an item to localStorage.
- `getItemsFromStorage()`: Retrieves items from localStorage.
- `onClickItem(e)`: Handles item clicks for editing or removing.
- `setItemToEdit(item)`: Sets an item to edit mode.
- `checkIfItemExists(item)`: Checks if an item already exists in localStorage.
- `removeItemFromDOM(targetElement)`: Removes an item from the DOM and localStorage.
- `removeItemFromStorage(targetElementText)`: Removes an item from localStorage.
- `clearAllItems()`: Clears all items from the DOM and localStorage.
- `filterItems(e)`: Filters items based on user input.
- `checkUI()`: Updates the UI based on the current state of the item list.

### Event Listeners

- `itemForm.addEventListener('submit', onaddItemSubmit)`: Handles the form submission for adding or updating items.
- `itemList.addEventListener('click', onClickItem)`: Handles clicks on items for editing or removing.
- `clearBtn.addEventListener('click', clearAllItems)`: Handles the clearing of all items.
- `filter.addEventListener('input', filterItems)`: Handles the filtering of items based on user input.
- `document.addEventListener('DOMContentLoaded', displayItemsOnPage)`: Displays items on page load.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Submit a pull request.

## License

This project is licensed under the MIT License.

---

Enjoy using Budgetbudyy to manage your budget items efficiently! If you have any questions or suggestions, feel free to open an issue or contribute to the project.
