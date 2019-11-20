$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyAob9-lg9uwWwNi_KcoouLcc1EntrgMyH4",
        authDomain: "music-player-520f7.firebaseapp.com",
        databaseURL: "https://music-player-520f7.firebaseio.com",
        projectId: "music-player-520f7",
        storageBucket: "music-player-520f7.appspot.com",
        messagingSenderId: "327986407844",
        appId: "1:327986407844:web:395594cc21d0b1b1d97931",
        measurementId: "G-PEJZFZY0F2"
    };
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();

    function player(tracks) {

        var elms = ['track', 'timer', 'duration', 'playBtn', 'pauseBtn', 'prevBtn', 'nextBtn', 'playlistBtn', 'volumeBtn', 'progress', 'bar', 'wave', 'loading', 'playlist', 'list', 'volume', 'barEmpty', 'barFull', 'sliderBtn'];
        elms.forEach(function (elm) {
            window[elm] = document.getElementById(elm);
        });

        var Player = function (playlist) {
            this.playlist = playlist;
            this.index = 0;

            track.innerHTML = '1. ' + playlist[0].title;

            playlist.forEach(function (song) {
                var div = document.createElement('div');
                div.className = 'list-song';
                div.innerHTML = song.title;
                div.onclick = function () {
                    player.skipTo(playlist.indexOf(song));
                };
                list.appendChild(div);
            });
        };



        Player.prototype = {

            play: function (index) {
                var self = this;
                var sound;

                index = typeof index === 'number' ? index : self.index;
                var data = self.playlist[index];


                if (data.howl) {
                    sound = data.howl;
                } else {
                    sound = data.howl = new Howl({
                        src: ['./' + tracks[0].p + '/' + data.file],
                        html5: true,
                        onplay: function () {

                            duration.innerHTML = self.formatTime(Math.round(sound.duration()));


                            requestAnimationFrame(self.step.bind(self));


                            wave.container.style.display = 'block';
                            bar.style.display = 'none';
                            pauseBtn.style.display = 'block';
                        },
                        onload: function () {

                            wave.container.style.display = 'block';
                            bar.style.display = 'none';
                            loading.style.display = 'none';
                        },
                        onend: function () {

                            wave.container.style.display = 'none';
                            bar.style.display = 'block';
                            self.skip('next');
                        },
                        onpause: function () {

                            wave.container.style.display = 'none';
                            bar.style.display = 'block';
                        },
                        onstop: function () {

                            wave.container.style.display = 'none';
                            bar.style.display = 'block';
                        },
                        onseek: function () {

                            requestAnimationFrame(self.step.bind(self));
                        }
                    });
                }


                sound.play();

                track.innerHTML = (index + 1) + '. ' + data.title;

                // Show the pause button.
                if (sound.state() === 'loaded') {
                    playBtn.style.display = 'none';
                    pauseBtn.style.display = 'block';
                } else {
                    loading.style.display = 'block';
                    playBtn.style.display = 'none';
                    pauseBtn.style.display = 'none';
                }

                // Keep track of the index we are currently playing.
                self.index = index;
            },

            /**
             * Pause the currently playing track.
             */
            pause: function () {
                var self = this;

                // Get the Howl we want to manipulate.
                var sound = self.playlist[self.index].howl;

                // Puase the sound.
                sound.pause();

                // Show the play button.
                playBtn.style.display = 'block';
                pauseBtn.style.display = 'none';
            },

            /**
             * Skip to the next or previous track.
             * @param  {String} direction 'next' or 'prev'.
             */
            skip: function (direction) {
                var self = this;

                // Get the next track based on the direction of the track.
                var index = 0;
                if (direction === 'prev') {
                    index = self.index - 1;
                    if (index < 0) {
                        index = self.playlist.length - 1;
                    }
                } else {
                    index = self.index + 1;
                    if (index >= self.playlist.length) {
                        index = 0;
                    }
                }

                self.skipTo(index);
            },

            /**
             * Skip to a specific track based on its playlist index.
             * @param  {Number} index Index in the playlist.
             */
            skipTo: function (index) {
                var self = this;

                // Stop the current track.
                if (self.playlist[self.index].howl) {
                    self.playlist[self.index].howl.stop();
                }

                // Reset progress.
                progress.style.width = '0%';

                // Play the new track.
                self.play(index);
            },

            /**
             * Set the volume and update the volume slider display.
             * @param  {Number} val Volume between 0 and 1.
             */
            volume: function (val) {
                var self = this;

                // Update the global volume (affecting all Howls).
                Howler.volume(val);

                // Update the display on the slider.
                var barWidth = (val * 90) / 100;
                barFull.style.width = (barWidth * 100) + '%';
                sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
            },

            /**
             * Seek to a new position in the currently playing track.
             * @param  {Number} per Percentage through the song to skip.
             */
            seek: function (per) {
                var self = this;

                // Get the Howl we want to manipulate.
                var sound = self.playlist[self.index].howl;

                // Convert the percent into a seek position.
                if (sound.playing()) {
                    //sound.seek(sound.duration() * per);
                }
            },

            /**
             * The step called within requestAnimationFrame to update the playback position.
             */
            step: function () {
                var self = this;

                // Get the Howl we want to manipulate.
                var sound = self.playlist[self.index].howl;

                // Determine our current seek position.
                var seek = sound.seek() || 0;
                timer.innerHTML = self.formatTime(Math.round(seek));
                progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

                // If the sound is still playing, continue stepping.
                if (sound.playing()) {
                    requestAnimationFrame(self.step.bind(self));
                }
            },

            /**
             * Toggle the playlist display on/off.
             */
            togglePlaylist: function () {
                var self = this;
                var display = (playlist.style.display === 'block') ? 'none' : 'block';

                setTimeout(function () {
                    playlist.style.display = display;
                }, (display === 'block') ? 0 : 500);
                playlist.className = (display === 'block') ? 'fadein' : 'fadeout';
            },

            /**
             * Toggle the volume display on/off.
             */
            toggleVolume: function () {
                var self = this;
                var display = (volume.style.display === 'block') ? 'none' : 'block';

                setTimeout(function () {
                    volume.style.display = display;
                }, (display === 'block') ? 0 : 500);
                volume.className = (display === 'block') ? 'fadein' : 'fadeout';
            },

            /**
             * Format the time from seconds to M:SS.
             * @param  {Number} secs Seconds to format.
             * @return {String}      Formatted time.
             */
            formatTime: function (secs) {
                var minutes = Math.floor(secs / 60) || 0;
                var seconds = (secs - minutes * 60) || 0;

                return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            }
        };

        // Setup our new audio player class and pass it the playlist.
        var player = new Player(tracks);

        // Bind our player controls.
        playBtn.addEventListener('click', function () {
            player.play();
        });
        pauseBtn.addEventListener('click', function () {
            player.pause();
        });
        prevBtn.addEventListener('click', function () {
            player.skip('prev');
        });
        nextBtn.addEventListener('click', function () {
            player.skip('next');
        });
        waveform.addEventListener('click', function (event) {
            player.seek(event.clientX / window.innerWidth);
        });
        playlistBtn.addEventListener('click', function () {
            player.togglePlaylist();
        });
        playlist.addEventListener('click', function () {
            player.togglePlaylist();
        });
        volumeBtn.addEventListener('click', function () {
            player.toggleVolume();
        });
        volume.addEventListener('click', function () {
            player.toggleVolume();
        });

        // Setup the event listeners to enable dragging of volume slider.
        barEmpty.addEventListener('click', function (event) {
            var per = event.layerX / parseFloat(barEmpty.scrollWidth);
            player.volume(per);
        });
        sliderBtn.addEventListener('mousedown', function () {
            window.sliderDown = true;
        });
        sliderBtn.addEventListener('touchstart', function () {
            window.sliderDown = true;
        });
        volume.addEventListener('mouseup', function () {
            window.sliderDown = false;
        });
        volume.addEventListener('touchend', function () {
            window.sliderDown = false;
        });

        var move = function (event) {
            if (window.sliderDown) {
                var x = event.clientX || event.touches[0].clientX;
                var startX = window.innerWidth * 0.05;
                var layerX = x - startX;
                var per = Math.min(1, Math.max(0, layerX / parseFloat(barEmpty.scrollWidth)));
                player.volume(per);
            }
        };

        volume.addEventListener('mousemove', move);
        volume.addEventListener('touchmove', move);

        // Setup the "waveform" animation.
        var wave = new SiriWave({
            container: waveform,
            style: "ios",
            width: window.innerWidth,
            height: window.innerHeight * 0.3,
            cover: true,
            speed: 0.03,
            amplitude: 0.7,
            frequency: 2
        });
        wave.start();

        // Update the height of the wave animation.
        // These are basically some hacks to get SiriWave.js to do what we want.
        var resize = function () {
            var height = window.innerHeight * 0.3;
            var width = window.innerWidth;
            wave.height = height;
            wave.height_2 = height / 2;
            wave.MAX = wave.height_2 - 4;
            wave.width = width;
            wave.width_2 = width / 2;
            wave.width_4 = width / 4;
            wave.canvas.height = height;
            wave.canvas.width = width;
            wave.container.style.margin = -(height / 2) + 'px auto';

            // Update the position of the slider.
            var sound = player.playlist[player.index].howl;
            if (sound) {
                var vol = sound.volume();
                var barWidth = (vol * 0.9);
                sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
            }
        };
        window.addEventListener('resize', resize);
        resize();

    }


    async function gT() {
        var id = location.href.split('#')[1];
        await firebase.database().ref(id).once('value', function (snapshot) {
            if (snapshot.exists()) {
                var type = snapshot.val().type;
                if (type == 'song') {
                    artist = snapshot.val().type;
                    title = snapshot.val().title;
                    file = snapshot.val().file;
                    cover = snapshot.val().cover;

                    $('#playlistBtn').hide();
                    $('#nextBtn').hide();
                    $('#prevBtn').hide();

                    $(document).attr("title", title);

                    var track = [{
                        title: title,
                        howl: null
                    }];
                    $.ajax({
                        url: './gmf.php',
                        type: 'POST',
                        data: { path: 'kkl_09k8-=0m(*', file: file },
                        success: function (result) {
                            $('#cover').attr('src', result.split('@#qwe')[0] + '/' + cover);
                            $('#cover').css('width', '100%');
                            $('#cover').css('height', '100%');
                            track[0]['file'] = result.split('@#qwe')[1];
                            track[0]['p'] = result.split('@#qwe')[0];
                            player(track, result.split('@#qwe')[0]);

                        }

                    });

                } else if (type == 'playlist') {
                    title = snapshot.val().title;
                    cover = snapshot.val().cover;
                    songs = snapshot.val().tracks.song;

                    $('#playlistBtn').show();
                    $('#nextBtn').show();
                    $('#prevBtn').show();

                    $(document).attr("title", title);

                    var tracks = [];
                    var __po = [];
                    Object.keys(songs).forEach(async function (e) {
                        await firebase.database().ref(songs[e]).once('value', function (snapshot) {
                            artist = snapshot.val().type;
                            title = snapshot.val().title;
                            file = snapshot.val().file;
                            cover = snapshot.val().cover;

                        });

                        tracks[e] = {title: title, howl: null}
                        __po[e] = {title: title, howl: null}

                        $.ajax({
                            url: './gmf.php',
                            type: 'POST',
                            data: { path: 'kkl_09k8-=0m(*', file: file },
                            success: function (result) {
                                $('#cover').attr('src', result.split('@#qwe')[0] + '/' + cover);
                                $('#cover').css('width', '100%');
                                $('#cover').css('height', '100%');
                                tracks[e]['file'] = result.split('@#qwe')[1];
                                tracks[e]['p'] = result.split('@#qwe')[0];
                                $('meta[name ="twitter:title"]').attr('content',title);

                                if (e == songs.length - 1) {
                                    player(tracks);
                                }
                            }
    
                        });


                    });
                    


                }


                  // player(tracks, __po[0]);
            }
        });
    }

    gT();




});