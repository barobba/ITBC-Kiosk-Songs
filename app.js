
// MAIN()
// THIS STARTS AFETER EVERYTHING ON THE PAGE IS LOADED
$(document).ready( function () {
  // PROGRAM GOES HERE

    // Get the remote data
    var song_url = "./data/songs.json";
    var song_callback = function(data) {
      $.each(data.nodes, function(index, song_record) { 
        var song = song_record.node;
        if (index < 10) {
          // For testing, we're limiting the number of songs to display
        
          // alert(index+' : '  + song.title +'  :  ' + song.field_song_audio_value); 
          
          // Song element
          var songTheme = $('<div class="song" />');
          songTheme.appendTo('#songs');

          // Song player
          var songPlayer = $('<div class="song-player"><span class="label label-player"></span> <span class="song-player"><object id=player" name="player" width="23" height="12">' + '<param name="movie" value="http://liveandtell.com/sites/liveandtell.com/modules/audio/player.swf?filename=' + song.field_song_audio_value +'">' + '<param name="wmode" value="transparent"><embed id="player" name="player" type="application/x-shockwave-flash" ' + 'wmode="transparent" src="http://liveandtell.com/sites/liveandtell.com/modules/audio/player.swf?filename=' + song.field_song_audio_value + '"width="23" height="12"></object></div>');
          songPlayer.appendTo(songTheme);
          
          // Song title
          var songTitle = $('<div class="song-title"><span class="label label-song-title">Title: </span> <span class="song-title">'+ song.title +'</span></div>');
          songTitle.appendTo(songTheme);
          
          // Song posted by
          var songPostedBy = $('<div class="song-posted-by"><span class="label label-artist">Posted by:</span> <span class="song-artist">' + song.name +'</span></div>').appendTo(songTheme);
          
          
        } // end if
        
      }); // end $.each
      
    }; // end song_callback
    
    // Make ajax call
    $.ajax(song_url, {dataType: 'json', success: song_callback});
    
});
