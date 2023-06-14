# Mutimedia Web App New Feature Elaboration

## Added Features

- Search Feature - allows users to search for files based on their names. 
- Share Feature - responsible for sharing a selected file in different platforms(like Facebook and Twitter, based on the file's path and share text).


## Elaboration of Search and Share features

1. `Search Feature`:

The search feature allows users to search for files based on their names. The search functionality is implemented using the handleSearch function and the searchQuery and searchResults states.The handleSearch function is called whenever the value of the search input field changes. It updates the searchQuery state with the new search query value.
Overall, the share feature allows users to share files using the Web Share API or a fallback mechanism, while the search feature enables users to search and filter files based on their names in real-time.

I chose the search feature because it enhances the usability of the system by providing a quick and convenient way to locate desired files without manually navigating through multiple directories. The search feature in the code allows users to find specific files within the file server. By implementing a search function, users can enter keywords or criteria to search for files based on their names or attributes. Users can save time and effort by simply entering their search terms and obtaining relevant results, improving efficiency and productivity.

## Working Mechanism Of Search Functionality:
- The handleSearch function is called when the user types in the search input field.
- It updates the searchQuery state with the value entered by the user.
- The useEffect hook is used to perform the search whenever the searchQuery or myFiles state changes.
- In the useEffect hook, the myFiles array is filtered based on the file name matching the search query (case-insensitive).
- The filtered results are stored in the searchResults state.
- The search results are displayed only when there is a search query (searchQuery is not empty) and there are matching files (searchResults is not empty).
- The search results are rendered as clickable elements, and when a result is clicked, the corresponding file is set as the selectedFile.

2. `Share Feature`:

The handleShare function is responsible for sharing a selected file. It takes the selected file as a parameter and creates a share text with the file name and path.
The function checks if the browser supports the Web Share API (navigator.share). If supported, it uses the API to share the file by calling navigator.share with the title, text, and URL parameters. If the sharing is successful, it logs a success message; otherwise, it logs an error message.
If the Web Share API is not supported, a fallback mechanism is used. It generates share URLs for different platforms like Facebook and Twitter, based on the file's path and share text. It then opens a new window for each platform using window.open to initiate sharing.

I chose this feature to enable users to easily distribute files to others. By implementing sharing functionality, users can generate shareable links or utilize built-in sharing options to send files to colleagues, friends, or clients. This feature promotes collaboration and facilitates file sharing across different platforms and applications. Instead of relying on traditional methods such as email attachments, users can efficiently share files with others by utilizing the system's sharing capabilities. This simplifies the sharing process and enhances communication and collaboration among users.

## Working Mechanism Of Share Functionality:
- The handleShare function is called when the user clicks the "Share" button for a file.
- It first generates the share text containing the file name and path.
- It checks if the navigator.share API is supported by the browser. If supported, it uses the API to share the file directly.
- If the navigator.share API is not supported, it falls back to using specific share URLs for different platforms (e.g., Facebook, Twitter).
- It opens a new window for each platform with the corresponding share URL, allowing the user to manually share the file.

## Conclusion
In conclusion, the search and share features enhance the Multimedia App by enabling users to quickly find files based on their search criteria and easily share files with others through different platforms. These features contribute to improved usability, efficiency, and collaboration within the file management system of Multimedia App.