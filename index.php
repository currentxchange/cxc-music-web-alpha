<?php
//--- Start the session ---\\
session_start();
?>
<!DOCTYPE html>
<html>
<head>

    <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NJ45MV8');</script>
<!-- End Google Tag Manager -->

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script src="https://www.googletagmanager.com/gtag/js?id=UA-131077696-1" script async></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	  gtag('config', 'UA-131077696-1');
		<!-- Facebook Meta -->
		window.fbAsyncInit = function() {
		FB.init({
		  appId            : '324828248114538',
		  autoLogAppEvents : true,
		  xfbml            : true,
		  version          : 'v2.70'
		});
		FB.AppEvents.logPageView();
	  };

	  (function(d, s, id){
		 var js, fjs = d.getElementsByTagName(s)[0];
		 if (d.getElementById(id)) {return;}
		 js = d.createElement(s); js.id = id;
		 js.src = "//connect.facebook.net/en_US/sdk.js";
		 fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));

		 function shareOverrideOGMeta(overrideLink, overrideTitle, overrideDescription, overrideImage)
{
	console.log(overrideLink+"____GG_"+ overrideTitle+"____GG_"+ overrideDescription+"____GG_"+ overrideImage);
	FB.ui({
		method: 'share_open_graph',
		action_type: 'og.likes',
		action_properties: JSON.stringify({
			object: {
				'og:url': overrideLink,
				'og:title': overrideTitle,
				'og:description': overrideDescription,
				'og:image': overrideImage
			}
		})
	},
	function (response) {
	// Action after response

	});
}

	</script>

	<meta charset=utf-8 />
	<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui'>
	<meta name="description" content="Find underground music from around the world on cXc Music, an app by @currentxchange">
	<meta name="author" content="Current X Change LLC">
	<meta name="keywords" content="cXc,current x change,cxc world,cXc Web app,cxc app,current x change app,music mapping app,music mapp">
	<!-- Facebook Meta -->
	<meta property="og:type" content="music.song">
	<meta property="og:title" content="cXc Music (Alpha)">
	<meta property="og:description" content="Find underground music from around the world on cXc Music, an app by @currentxchange">
	<meta property="og:image" content="https://music.cxc.world/images/cXc-Music-Sticker-Simplified[600x600].png">
	<meta property="fb:app_id" content="324828248114538">
	<meta property="og:site_name" content="cXc Music">
		<!-- Twitter Meta -->
	<meta name="twitter:title" content="cXc Music (Alpha)">
	<meta name="twitter:description" content="Find underground music from around the world on cXc Music, an app by @currentxchange">
	<meta name="twitter:image" content="https://music.cxc.world/images/cXc-Music-Sticker-Simplified[600x600].png">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@currentXchange">
	<meta name="twitter:image:src" content="https://music.cxc.world/images/cXc-Music-Sticker-Simplified[600x600].png">




	<!-- Mobile Header styling -->
	<!-- Chrome, Firefox OS and Opera -->
	<meta name="theme-color" content="#121212">
	<!-- Windows Phone -->
	<meta name="msapplication-navbutton-color" content="#121212">
	<!-- iOS Safari -->
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="#121212">




	<title>cXc Music (Alpha)</title>



	<!-- Dude, can I query that J -->
	<script src='https://code.jquery.com/jquery-3.3.1.min.js'></script>
	<script src='https://code.jquery.com/ui/1.12.1/jquery-ui.min.js'></script>

	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js" integrity="sha384-pjaaA8dDz/5BgdFUPX6M/9SUZv4d12SUPF0axWc+VRZkx5xU3daN+lYb49+Ax+Tl" crossorigin="anonymous"></script>

  <!-- Leaflet Stuffs  -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
   crossorigin=""/>
   <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
  	integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
  	crossorigin="true">
  </script>

<!-- Leaflet Providers PLUG PLUG -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-providers/1.5.0/leaflet-providers.min.js"></script>

<!-- Leaflet Fullscreen -->
<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js'></script>
<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' rel='stylesheet' />

<!-- CooOOOOookie Crisp -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.0/js.cookie.min.js"></script>
<!--<script src="js/plug/js.cookie.js"></script>-->

<!-- Slugs on Drugs -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/speakingurl/14.0.1/speakingurl.min.js"></script>


<!-- Is this really required? -->
<!--<script src="js/plug/require.js"></script> -->
<script src="bundle.js"></script>

<!-- JS History Channel
<script src="js/plug/history.adapter.jquery.js"></script>
<script src="js/plug/jquery.history.js"></script>
 -->

<!-- Is it getting Steemy in here? -->
<script src="https://cdn.jsdelivr.net/npm/steemconnect@latest"></script>

<!-- JS Social -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials.min.js"></script>


<!-- Daang Girl, You got STYLE -->
	<!-- AND you my type.. -->
	<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="style/main.css" />
<link rel="stylesheet" href="style/responsive.css" />

<!-- F*nting Awesome!! -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
<link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials.css" />

<link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials-theme-minima.css" />


<!--	<script src='http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet-src.js'></script>
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

-->
</head>
<body>
    <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NJ45MV8"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
		<?php include 'search_selectors.php'; ?>
	<div class="jumbotron" id="slide-left">
		<?php include 'slide_left.php'; ?>
	</div>






	<div class="jumbotron" id="active-music-jumbo">

		<div id="close-jumbo"></div>
		<span id="chart-return-button"></span>
		<div id="active-music-jumbo-bg"></div>
		<div id="profiles-jumbo">
			<span id="by-label">by:</span>
			<span class="yt-profile"></span>
			<span class="sc-profile"></span>
			<span class="spot-profile"></span>
		</div>
		<h1 id="title-jumbo">Loading...</h1>
		<!-- <div id="jumbo-players"> -->
			<div class="yt-vid"></div>
			<div id="yt-extras">
				<span id="yt-download-link"></span>
			</div>
			<div class="sc-play"></div>
			<div class="spot-play"></div>


		<!-- </div> -->
			<div id="icons">

					<h1 id="native-links-title" class="jumbo-togs">Music Links</h1>
				<hr class="jumbo-togs" />
				<span id="yt-icon"></span>

				<span id="sc-icon"></span>

				<span id="spot-icon"></span>
			</div> 		<!-- </div id="icons"> -->


			<hr class="jumbo-togs" />

			<!-- Sharing is Caring-->
					<h1 id="sharing-links-title" class="jumbo-togs">Share This Music</h1>
		 			<hr class="jumbo-togs" />
					<div id="share-music" class="center jumbo-togs"></div>
					<hr class="jumbo-togs" />
					<div id="up-button-in" class="up-button center" role="button"><img src="images/icons/Sol-Chip-[NoRays][Circled]-Icon-v1.ffff00.svg" width="100" height="100" /></div>




<div style= "position:relative">
	<ul id="flag-options" class="labelOne inspectah-selects">
		<li class ="tiles-option" value="not-music">not music</li>
		<li value="broken">player/link broken</li>
		<li value="bad-loc">incorrect location</li>
		<li value="bad-info">incorrct genre/mood/format info</li>
		<li value="multiple-in-one">multiple songs in single post</li>
		<li value="inappropriate">content is inappropriate</li>
		<li value="terrible-music">really bad music</li>
	</ul>
</div>
<div id="song-gmf">
	<span class="labelOne" id="sameGenre"></span>
	<span class="labelOne" id="sameMood"></span>
	<span class="labelOne" id="saneFormat"></span>
	<span class="labelOne" id="showAllSame">show similar</span>
</div>


<div id="steem-options" style="display:none">
	<span class="labelOne" id="flag-content"></span>
	<span class="labelOne" id="post-to-steem"></span>
</div>

<span style="display:none" id="steem-engine"></span>

	</div><!-- END .jumbotron -->



		<?php include 'settings.php'; ?>
	<div id="bottom-menus">

		<span id="settings-label" class="labelOne">
		  Settings
		</span>
		<span id="steemit-login-link" class="labelOne">
		  Steemit Login
		</span>
		<!--
		<span id="how-to-label" class="labelOne">
			<a id="how-to-link" target="_blank" href="https://steemit.com/cxcmusic/@currentxchange/how-to-use-cxc-music">How To Post</a>
		</span>
	-->
		<span id="my-location-link" class="labelOne">Go To My Location</span>
		<span id="learn-menu-label" class="labelOne" data-toggle="modal" data-target="#learnMoreModal">Learn More </span>

	</div>

	<?php include 'learn_menu.php'; ?>

	<div id='map'></div>
	<?php include 'charts_display.php'; ?>
<div id="alert-holder" class="bottom-alert"></div>

<!-- Maps and Things -->
  <script src="js/map.js"></script>
<!-- Map First, now things -->
	<script src="js/currency-display.js"></script>
	<script src="js/charts.js"></script>
	<script src="js/markers.js"></script>
	<script src="js/steemy-sex.js"></script>

	<script src="js/add-music.js"></script>
	<script src="js/settings.js"></script>
	<script src="js/learn-menu.js"></script>

</body>

</html>
