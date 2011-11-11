
// MAIN()
// THIS STARTS AFETER EVERYTHING ON THE PAGE IS LOADED
$(document).ready( function () {
  // PROGRAM GOES HERE

    // Get the remote data
    var song_url = "./data/songs.json";
    var song_callback = function(data) {
 
      
      $.each(data.nodes, function(key, value) { 
      // alert(key+' : '  + value.node.title +'  :  ' + value.node.field_song_audio_value); 
        var $newdiv1 = $('<h2> '+ value.node.title +'</h2>');
        $('body').append($newdiv1);
        var $newdiv2 = $('<h2> Artist: '+ value.node.name +'</h2>');
        $('body').append($newdiv2);
        var $player = $('<object id= player" name="player" width="23" height="12">'+
'<param name="movie" value="http://liveandtell.com/sites/liveandtell.com/modules/audio/player.swf?filename='+value.node.field_song_audio_value+'">'+
'<param name="wmode" value="transparent"><embed id="player" name="player" type="application/x-shockwave-flash" '+
'wmode="transparent" src="http://liveandtell.com/sites/liveandtell.com/modules/audio/player.swf?filename='+value.node.field_song_audio_value+     '"width="23" height="12"></object>');

$('body').append($player);
      });
      
    
    };
    $.ajax(
      song_url,
      {
        dataType: 'json',
        success: song_callback
      }
    );
 
  
  
     
});


