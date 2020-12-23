describe_("Player", function() {
  var player;
  var song;

  beforeEach_(function() {
    player = new Player();
    song = new Song();
  });

  it_("should be able to play a Song", function() {
    player.play(song);
    expect_(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect_(player).toBePlaying(song);
  });

  describe_("when song has been paused", function() {
    beforeEach_(function() {
      player.play(song);
      player.pause();
    });

    it_("should indicate that the song is currently paused", function() {
      expect_(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect_(player).not.toBePlaying(song);
    });

    it_("should be possible to resume", function() {
      player.resume();
      expect_(player.isPlaying).toBeTruthy();
      expect_(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it_("tells the current song if the user has made it a favorite", function() {
    spyOn_(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect_(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe_("#resume", function() {
    it_("should throw an exception if song is already playing", function() {
      player.play(song);

      expect_(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
});
