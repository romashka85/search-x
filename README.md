# React + Vite

### To start the app:

- Clone the Repository.
- (npm install)
- (npm run dev)

## Search Application Documentation

The Search Application is a React-based project that offers an interactive search bar with features like:

- Search suggestions and history management.
- Dynamic dropdown behavior.
- Keyboard navigation and mouse interaction.

## Functionality Details

### SearchBar Features

Typing and Suggestions:

- Updates searchQuery as the user types.
- Shows suggestions dynamically in a dropdown.

Keyboard Navigation:

- Arrow keys (ArrowUp/ArrowDown): Navigate through suggestions.
- Enter: Selects a suggestion.
- Escape: Closes the dropdown.

Dropdown Management:

- Opens on input focus or click.
- Closes when clicking outside the component (via useClickOutside hook).

History Integration:

- Suggests recent searches alongside live results.
- Allows removal of individual history entries using the RemoveButton.

Icons:

- IoIosSearch: Search icon.
- IoMdClose: Clear query icon.
- GoClock: Indicates recent searches.

## Usage

To use the application:

- Input a query in the search bar.
- Select a suggestion from the dropdown or press Enter.
- View results dynamically updated by ResultList.

### Additional Features

- Click outside the dropdown to close it.
- Clear the query using the close button.
