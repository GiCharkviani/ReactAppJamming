import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../PlayList/PlayList';
import Spotify from '../../Util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListName: 'My Playlist',
      playListTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removaTrack = this.removaTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }



  addTrack(track){
    let tracks = this.state.playListTracks;
    if(tracks.find(savedtrack => savedtrack.id === track.id)){
      return;
    }

    tracks.push(track);
    this.setState({playListTracks: tracks})
  }


  removaTrack(track){
    let tracks = this.state.playListTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playListTracks: tracks});
  }

  updatePlaylistName(name){
    this.setState({
      playListName: name
    })
  }

  savePlaylist(){
    const trackUris = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackUris).then(()=> {
      this.setState({playListName: 'New Playlist', playListTracks: []})
    })
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
            onAdd={this.addTrack} />
            <Playlist playListName={this.state.playListName} playListTracks={this.state.playListTracks} onRemove={this.removaTrack} onNameChange={this.updatePlaylistName}  onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }

}

export default App;

