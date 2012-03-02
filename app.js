
var songData;
var audioPlayer;

$(document).ready( function () {

  //
  // Retrieve the song data, and place it on the page
  //
  
  var song_url = "packs_songs/_data.json";
  $.ajax( song_url, {
    dataType: 'json', 
    success: function(data) {
      var songData = data;
      
      $.each(songData.songs, function(index, songRecord) {
        
        //
        // For each song
        //
        
        // Get song data
	      var song = songRecord;
    
	      // Add song to list of songs
	      var songItem = themeSongItem(song, index);
        songItem.appendTo('#song-list-container');

        // Add click event handler, so this song will be displayed when clicked
        songItem.click(function(){
          actionReplaceSong(song, index);
        });
        
      });
      
      // Display the first song
      var firstSongIndex = 0;
      actionReplaceSong(songData.songs[firstSongIndex], firstSongIndex);
      
    }
  });
  
});

function actionReplaceSong(song, index) {
  
  // Replace the current song with the given selection
  var currentSong = themeCurrentSong(song, index);
  $('#song-container #song-container-element').html(currentSong);
  
  //
  // Add the "play/stop" event
  //
  
  currentSong.children('.song-player').click(function(){
    
    $(this).toggleClass('song-player-playing');
    if ($(this).hasClass('song-player-playing')) {
      document.getElementById('audio-player-object').play();
    }
    else {
      document.getElementById('audio-player-object').pause();
      document.getElementById('audio-player-object').currentTime = 0;
    }
  });
  
  // Add the "onended" event handler
  document.getElementById('audio-player-object').onended = function(){
    currentSong.children('.song-player').removeClass('song-player-playing');
  };

}

function themeSongItem(song, index) {
  var songItem = $('#hidden-parts .song-list-item').clone();
  songItem.attr('id', index);
  songItem.children('.title').html(song.title);
  return songItem;
}

function themeCurrentSong(song, index) {
  var currentSong = $('#hidden-parts .song').clone();
  currentSong.attr('id', index);
  currentSong.children('.song-player').prepend(themeAudioPlayer('packs_songs/'+song.songAudio.audioID+'.ogg'));
  currentSong.children('.song-title').html(song.title);
  currentSong.find('.song-lyrics').html(song.songLyrics ? song.songLyrics : '');
  currentSong.find('.song-lyrics-translated').html(song.songTranslationLyrics ? song.songTranslationLyrics : '');
  currentSong.children('.song-posted-by').html('Posted by ' + song.postedByFirstName + ' ' + song.postedByLastName);
  currentSong.children('.song-notes').html(song.songNotes ? song.songNotes : '');
  currentSong.children('.song-id').html(song.NID);
  return currentSong;
}

function themeAudioPlayer(sourceURL) {
  
  // Prepare audio tag
  var audioTag = $('<audio id="audio-player-object" />');
  audioTag.attr('preload', 'auto');

  // Prepare source
  var audioSource = $('<source />');
  audioSource.attr('src', sourceURL).attr('type', 'audio/ogg');
  
  // Append audio with the source
  audioTag.append(audioSource);
  
  var audioPlayer = audioTag;
  return audioTag;
}
