beforeEach_(function () {
    jasmine_.Expectation.addMatchers({
        toBePlaying: function () {
            return {
                compare: function (actual, expected) {
                    var player = actual;

                    return {
                        pass: player.currentlyPlayingSong === expected && player.isPlaying
                    }
                }
            };
        }
    });
});
