import React, { useState, useEffect } from 'react';
import { data } from './data';
import { Header } from "./components/Header";
import { AudioPlayer } from './components/AudioPlayer';
import { DocumentViewer } from './components/DocumentViewer';
import { VideoPlayer } from './components/VideoPlayer';
import { ImageViewer } from './components/ImageViewer';
import { Pie, Bar } from 'react-chartjs-2';
import {} from './index.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function App() {
  const [myFiles, setMyFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filePath, setFilePath] = useState("/file-server/");
  const [showChartModal, setShowChartModal] = useState(false);

  const handleDelete = () => {
    if (selectedFile) {
      const updatedFiles = myFiles.filter(file => file.id !== selectedFile.id);
      setMyFiles(updatedFiles);
      setSelectedFile(null);
    }
  };
 const handleShare = (file) => {
    const shareText = `Sharing file: ${file.name}\nPath: ${file.path}`;
  
    if (navigator.share) {
      navigator.share({
        title: 'Share File',
        text: shareText,
        url: file.path, // Include the file URL for sharing
      })
        .then(() => {
          console.log('File shared successfully');
        })
        .catch((error) => {
          console.error('Error sharing file:', error);
        });
    } else {
      // Fallback for unsupported browsers or platforms
      const shareUrl = encodeURIComponent(file.path);
      const platforms = [
        { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
        { name: 'Twitter', url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(shareText)}` },
        // Add more platforms as needed
      ];
  
      platforms.forEach((platform) => {
        window.open(platform.url, `_blank${platform.name}`);
      });
    }
  };
  
  useEffect(() => {
    // Add file details and metadata to the existing data array
    const updatedData = data.map((file) => ({
      ...file,
      created: new Date().toLocaleString(),
      author: 'Bindu',
    }));

    setMyFiles(updatedData);
  }, []);

  useEffect(() => {
    // Perform the search whenever the search query changes
    const filteredResults = myFiles.filter((file) =>
      file.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [searchQuery, myFiles]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Files Breakdown',
      },
    },
  };

  return (
    <> 
      {showChartModal && (
        // Modal for files breakdown
        <div style={styles.modal}>
        <div style={styles.modalContent}>
         <div style={styles.modalHeader}>
          <p style={{ fontWeight: "bold" }}>Files Breakdown</p>
          <button style={styles.closeButton} onClick={() => setShowChartModal(false)}>close</button>
         </div>
         <div style={styles.modalBody}>
          <Pie
           data={{
            labels: ['Video', 'Audio', 'Document', 'Image'],
            datasets: [
             {
              label: 'Files Breakdown',
              data: [myFiles.filter(file => file.type === 'video').length, myFiles.filter(file => file.type === 'audio').length, myFiles.filter(file => file.type === 'document').length, myFiles.filter(file => file.type === 'image').length],
              backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
             },
            ],
           }}
          />
          <Bar
           data={{
            labels: ['Video', 'Audio', 'Document', 'Image'],
            datasets: [
             {
              label: 'Files Breakdown',
              data: [myFiles.filter(file => file.type === 'video').length, myFiles.filter(file => file.type === 'audio').length, myFiles.filter(file => file.type === 'document').length, myFiles.filter(file => file.type === 'image').length],
              backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
             },
            ],
           }}
           options={barChartOptions}
          />
         </div>
        </div>
       </div>
      )}

      <div className="App">
        <Header />

        <div style={styles.container}>
          <div style={{ padding: 10, paddingBottom: 0 }}>
            <p style={{ fontWeight: "bold" }}>My Files</p>
            <p>{selectedFile ? selectedFile.path : filePath}</p>
            <div style={styles.controlTools}>

              {/* Rename Button */}
              <button
                style={styles.controlButton}
                disabled={!selectedFile}
                onClick={() => {
                  if (selectedFile) {
                    const newName = prompt("Enter new name");
                    if (newName !== null) {
                      const newFiles = myFiles.map(file => {
                        if (file.id === selectedFile.id) {
                          return {
                            ...file,
                            name: newName
                          };
                        }
                        return file;
                      });
                      setMyFiles(newFiles);
                    }
                    setSelectedFile(null);
                  }
                }}
              >
                Rename          </button>

{/* Files Breakdown Button */}
<button
  style={styles.controlButton}
  onClick={() => setShowChartModal(true)}
>
  Files Breakdown
</button>

{/* Download Button */}
<button
  style={styles.controlButton}
  disabled={!selectedFile}
  onClick={() => {
    if (selectedFile) {
      window.open(selectedFile.path, "_blank");
    }
  }}
>
  Download
</button>

{/* Delete Button */}
<button
  style={styles.controlButton}
  disabled={!selectedFile}
  onClick={handleDelete}
>
  Delete
</button>
<div style={{ marginLeft: "10px" }}>&nbsp;</div>
<div className="search-bar">
  <input
    type="text"
    placeholder="Type here to search your desired file..."
    value={searchQuery}
    onChange={handleSearch}
  />
</div>

{/* Display search results only when there is a search query */}
{searchQuery && (
  <div className="search-results">
    {searchResults.length > 0 ? (
      searchResults.map((file) => (
        <div
          key={file.id}
          onClick={() => {
            setSelectedFile(file);
            setSearchQuery(file.name); // Set the selected file name as the new search query
          }}
          className={
            selectedFile && selectedFile.id === file.id
              ? 'search-result selected'
              : 'search-result'
          }
        >
          {file.name}
        </div>
      ))
    ) : (
      <div className="file-not-found">
        Searched file not found
      </div>
    )}
  </div>
)}
</div>
</div>

<div style={styles.fileContainer}>
<div style={{ width: "100%", padding: 10 }}>
{myFiles.map((file) => {
  if (file.path.slice(0, filePath.length) === filePath) {
    return (
      <div
        style={styles.file}
        className={selectedFile && selectedFile.id === file.id ? 'selectedFile' : ''}

        key={file.id}
        onClick={() => {
          if (selectedFile && selectedFile.id === file.id) {
            setSelectedFile(null);
            return;
          }
          setSelectedFile(file);
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <p>{file.name}</p>
  <button onClick={() => handleShare(file)} style={{ padding: '3px 10px', borderRadius: '15px' }}>Share</button>
</div>
      </div>
    );
  }
    
})}
</div>

{selectedFile && (
  <div style={styles.fileViewer}>
    {selectedFile.type === 'video' && (
      <VideoPlayer path={selectedFile.path} />
    )}
    {selectedFile.type === 'audio' && (
      <AudioPlayer path={selectedFile.path} />
    )}
    {selectedFile.type === 'document' && (
      <DocumentViewer path={selectedFile.path} />
    )}
    {selectedFile.type === 'image' && (
      <ImageViewer path={selectedFile.path} />
    )}
    <p style={{ fontWeight: 'bold', marginTop: 10 }}>
      {selectedFile.name}
    </p>
    <p>
      Path: <span style={{ fontStyle: 'italic' }}>{selectedFile.path}</span>
    </p>
    <p>
      file type: <span style={{ fontStyle: 'italic' }}>{selectedFile.type}</span>
    </p>
   
 
  </div>
)}

</div>
</div>
</div>
</>
);
}


const styles = {
container: {
backgroundColor: '#fff',
color: '#000',
},
fileContainer: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'flex-start',
flexDirection: 'row',
},

file: {
  backgroundColor: '#eee',
  padding: '10px',
  marginBottom: '10px',
  cursor: 'pointer',
  width: '100%',
 
},
selected: {
  backgroundColor: '#C01313', // Change the color to your desired value
},

fileViewer: {
padding: '10px',
margin: '10px',
width: '30vw',
height: '100vh',
cursor: 'pointer',
borderLeft: '1px solid #000'
},
controlTools: {
display: 'flex',
gap: '10px',
alignItems: 'center',
flexDirection: 'row',
padding: '10px',
},
controlButton: {
padding: '10px',
border: 'none',
cursor: 'pointer',
fontWeight: 'bold',
backgroundColor: '#eee',
},
// Modal styles...
modal: {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: '#fff',
  padding: '20px',
  height: '50vh',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
},
modalClose: {
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '10px',
  cursor: 'pointer',
},
modalBody:{
  width: '100%',
  height: '90%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  padding: '10px',
},
modalHeader: {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
},
closeButton: {
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  backgroundColor: '#eee',
}
};