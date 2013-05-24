/* CACHE STUFF */
var broadcastStatus = $('#broadcast-status');
var broadcastLivestream = $('#broadcast-livestream');
var broadcastTV = $('#broadcast-tv');
var broadcastFm = $('#broadcast-fm');
var socialMedia = $('section#social-media');
var sitePosts = $('section#site-posts div.posts');

/* A CLOCK FOR FUTURE USE WITH SCHEDUAL */
var currentLocalTime = new Date();
var currentTime = new Date(currentLocalTime.getUTCFullYear(), currentLocalTime.getUTCMonth(), currentLocalTime.getUTCDate(), currentLocalTime.getUTCHours(), currentLocalTime.getUTCMinutes(), currentLocalTime.getUTCSeconds());
var day = currentTime.getDay();
var hours = currentTime.getHours();
var minutes = currentTime.getMinutes();
var totalMinutes = (hours * 60) + minutes;
var timer;
timer = setInterval(function() {
	currentLocalTime = new Date();
	currentTime = new Date(currentLocalTime.getUTCFullYear(), currentLocalTime.getUTCMonth(), currentLocalTime.getUTCDate(), currentLocalTime.getUTCHours(), currentLocalTime.getUTCMinutes(), currentLocalTime.getUTCSeconds());
	day = currentTime.getDay();
	hours = currentTime.getHours();
	minutes = currentTime.getMinutes();
	totalMinutes = (hours * 60) + minutes;
}, 1000);

/* FOR NOW ALWAYS LIVE */
var live = true;

/* FM PLAYER INIT FUNCTION */

function initFm() {
	if (live) {
		broadcastFm.show();
		socialMedia.show();

		var stream = {
			title: "Renosance FM",
			mp3: "http://icecast.commedia.org.uk:8000/resonance_hi.mp3"
		},
			ready = false;
		var my_jPlayer = $("#jplayer"),
			my_playState = $("#jp_container .play-state"),
			my_extraPlayInfo = $("#jp_container .extra-play-info");
		var opt_text_playing = "Now playing",
			opt_text_selected = "Track selected";
		$.jPlayer.timeFormat.padMin = false;
		$.jPlayer.timeFormat.padSec = false;
		$.jPlayer.timeFormat.sepMin = " min ";
		$.jPlayer.timeFormat.sepSec = " sec";
		my_playState.text(opt_text_selected);
		my_jPlayer.jPlayer({
			ready: function() {
				ready = true;
				$(this).jPlayer("setMedia", stream);
			},
			timeupdate: function(event) {
				my_extraPlayInfo.text(parseInt(event.jPlayer.status.currentPercentAbsolute, 10) + "%");
			},
			play: function(event) {
				my_playState.text(opt_text_playing);
			},
			pause: function(event) {
				my_playState.text(opt_text_selected);
				$(this).jPlayer("clearMedia");
			},
			ended: function(event) {
				my_playState.text(opt_text_selected);
			},
			error: function(event) {
				if (ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
					$(this).jPlayer("setMedia", stream).jPlayer("play");
				}
			},
			swfPath: "js",
			cssSelectorAncestor: "#jp_container",
			supplied: "mp3",
			preload: "none",
			wmode: "window"
		});

		/* 		not sure what this is about */
		broadcastFm.css('opacity', 1);
		socialMedia.css('opacity', 1);

		broadcastStatus.html('FM Live');
	} else {
		initPosts();
	}
}

/* THIS DISPLAYS LATEST POSTS FROM MAIN SITE IF PLAYER IS OFFLINE */

function initPosts() {
	$.getJSON("http://novaramedia.com/api/fm/?callback=?", null, function(data) {
		var posts_insert = [];
		$.each(data.posts, function(i, item) {
			posts_insert.push('<a target="_blank" href="' + item.permalink + '"><li>' + item.title + '</li></a>');
		});
		$('<ul/>', {
			'id': 'site-posts-posts',
			html: posts_insert.join('')
		}).prependTo(sitePosts);
	});
	$('section#site-posts').show().css('opacity', 1);
}

$(document).ready(function() {

	initFm();

});