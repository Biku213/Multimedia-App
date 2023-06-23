# Mutimedia Web App New Feature Elaboration

## Added Features

- Search Feature - allows users to search for files based on their names. 
- Filter Feature - enables a more structured and categorized view of files.

## Elaboration of Search and Filter features

1. `Search Feature`

The search feature allows users to search for files based on their names. The search functionality is implemented using the handleSearch function and the searchQuery and searchResults states.The handleSearch function is called whenever the value of the search input field changes. It updates the searchQuery state with the new search query value.

I chose the search feature because it enhances the usability of the system by providing a quick and convenient way to locate desired files without manually navigating through multiple directories. The search feature in the code allows users to find specific files within the file server. By implementing a search function, users can enter keywords or criteria to search for files based on their names or attributes. Users can save time and effort by simply entering their search terms and obtaining relevant results, improving efficiency and productivity.

## Working Mechanism Of Search Functionality :
- The handleSearch function is called when the user types in the search input field.

- It updates the searchQuery state with the value entered by the user.

- The useEffect hook is used to perform the search whenever the searchQuery or myFiles state changes.

- In the useEffect hook, the myFiles array is filtered based on the file name matching the search query (case-insensitive).

- The filtered results are stored in the searchResults state.

- The search results are displayed only when there is a search query (searchQuery is not empty) and there are matching files (searchResults is not empty).

- The search results are rendered as clickable elements, and when a result is clicked, the corresponding file is set as the selectedFile.

<br> <br>

2. `Filter Feature`

The filter functionality allows users to filter files based on their types, such as video, audio, document, or image. The filter is implemented using a dropdown select element that provides options for different file types.

I chose the filter feature beacause it enables a more structured and categorized view of files. This improves the overall organization and accessibility of files, making it easier for users to locate and manage specific files. By implementing filter functionality, the code allows users to filter their files based on different types, enhancing the organization and accessibility of files. When a user selects a specific file type from the dropdown select element, the code filters the displayed files accordingly, showing only the files that match the selected type.

## Working Mechanism Of Filter Functionality :
- The filter option is stored in the filterOption state using the useState hook. It is initialized with the value 'all' by default, which indicates that all files should be displayed.

- The filterOption state is used as a dependency in the useEffect hook to trigger filtering whenever the filter option changes.

- Inside the useEffect hook, the myFiles state is filtered based on the selected filter option. If the filter option is not 'all', the files are filtered using the filter method based on the type property of each file. The filtered files are stored in the filteredFiles state.

- The filteredFiles state is then used to render the list of files in the file container. The map method is used to iterate over the filteredFiles array and display each file as a separate component.

- The filter option is controlled using a <select> element in the UI. The value attribute of the <select> element is bound to the filterOption state, and the onChange event is used to update the filterOption state whenever the user selects a different filter option.

- When the user selects a filter option, the filterOption state is updated, which triggers the useEffect hook to filter the files based on the selected option. The filtered files are then displayed in the file container.

## Conclusion
In conclusion, the search and filter features enhance the Multimedia App by enabling users to quickly find files based on their search criteria and easily filter files based on their types, such as video, audio, document, or image. These features contribute to improved usability, efficiency, and collaboration within the file management system of Multimedia App.