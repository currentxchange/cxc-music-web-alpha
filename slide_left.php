<div id="close-add-music"></div>

<div id="sol-bg"></div>
<div id="blue-bg"></div>
<div id="purple-bg"></div>

<form id="submit-music" action="#" style="display:none" method="post" target="_blank">



<div class="form-group">
  <h3><label>Paste URLS for one musical creation here. Please choose the most relevant location.</label></h3>
  <div id="add-music-error" class="alert alert-warning" style="display:none"></div>
  <div id="add-music-success" class="alert alert-success" style="display:none"></div>
    <input type="text" value="" id="yt" placeholder="Youtube URL" class="form-control" />
    <input type="text" value="" id="sc" placeholder="Soundcloud URL" class="form-control" />
    <input type="text" value="" id="spot" placeholder="Spotify URL" class="form-control" />
</div>


<div id="select-labels">
  <div>Genre</div>
  <div>Mood</div>
  <div>Format</div>
</div>

<div id="select-wrap" class="justify-content-center">


  <!--  Genre Selector  -->
  <select class="dropdown-menu"  id="genre">
    <option role="presentation" class="label-add-music" value=""><a role="menuitem" tabindex="-1" href="#">Choose a Genre</a></option>

    <option role="presentation" value="hip-hop"><a role="menuitem" tabindex="-1" href="#">Hip-Hop / Rap / RnB</a></option>
    <option role="presentation" value="reggaeton"><a role="menuitem" tabindex="-1" href="#">Reggaeton</a></option>
    <option role="presentation" value="edm"><a role="menuitem" tabindex="-1" href="#">EDM</a></option>
    <option role="presentation" value="rock"><a role="menuitem" tabindex="-1" href="#">Rock</a></option>
    <option role="presentation" value="reggae"><a role="menuitem" tabindex="-1" href="#">Reggae</a></option>
    <option role="presentation" value="world"><a role="menuitem" tabindex="-1" href="#">Folk / World</a></option>
    <option role="presentation" value="jazz"><a role="menuitem" tabindex="-1" href="#">Jazz</a></option>
    <option role="presentation" value="fusion"><a role="menuitem" tabindex="-1" href="#">Fusion</a></option>
    <option role="presentation" value="conscious"><a role="menuitem" tabindex="-1" href="#">Conscious / Aquarian Age</a></option>
    <option role="presentation" value="pop"><a role="menuitem" tabindex="-1" href="#">Pop</a></option>
    <option role="presentation" value="classical"><a role="menuitem" tabindex="-1" href="#">Classical</a></option>
    <option role="presentation" value="blues-soul"><a role="menuitem" tabindex="-1" href="#">Blues / Soul</a></option>
    <option role="presentation" value="country"><a role="menuitem" tabindex="-1" href="#">Country</a></option>

    <option role="presentation" value=""><a role="menuitem" tabindex="-1" href="#">I ain't got no type</a></option>

  </select>

  <!--  Mood Selector -->
  <select class="dropdown-menu" id="mood" role="menu" >
    <option role="presentation" class="label-add-music" value=""><a role="menuitem" tabindex="-1" href="#">Choose a Mood</a></option>

    <option role="presentation" value="chill"><a role="menuitem" tabindex="-1" href="#">Chill</a></option>
    <option role="presentation" value="happy"><a role="menuitem" tabindex="-1" href="#">Happy</a></option>
    <option role="presentation" value="dance"><a role="menuitem" tabindex="-1" href="#">Dance</a></option>
    <option role="presentation" value="party"><a role="menuitem" tabindex="-1" href="#">Party / Club</a></option>
    <option role="presentation" value="joyful"><a role="menuitem" tabindex="-1" href="#">Joyful</a></option>
    <option role="presentation" value="energizing"><a role="menuitem" tabindex="-1" href="#">Energizing / Uplifting</a></option>
    <option role="presentation" value="trance"><a role="menuitem" tabindex="-1" href="#">Trance</a></option>
    <option role="presentation" value="melancholic"><a role="menuitem" tabindex="-1" href="#">Melancholic</a></option>
    <option role="presentation" value="emo"><a role="menuitem" tabindex="-1" href="#">Emotional</a></option>
    <option role="presentation" value="angry"><a role="menuitem" tabindex="-1" href="#">Angry</a></option>
    <option role="presentation" value="heavy"><a role="menuitem" tabindex="-1" href="#">Heavy / Hard</a></option>
    <option role="presentation" value="light"><a role="menuitem" tabindex="-1" href="#">Light / Easy</a></option>


    <option role="presentation" value=""><a role="menuitem" tabindex="-1" href="#">No Mood Here.</a></option>

  </select>

  <!--  Format Selector -->
  <select class="dropdown-menu" id="format" role="menu" >
    <option role="presentation" class="label-add-music" value=""><a role="menuitem" tabindex="-1" href="#">Choose a Format</a></option>

    <option role="presentation" value="song"><a role="menuitem" tabindex="-1" href="#">Song / Single</a></option>
    <option role="presentation" value="instrumental"><a role="menuitem" tabindex="-1" href="#">Instrumental</a></option>
    <option role="presentation" value="album"><a role="menuitem" tabindex="-1" href="#">Album as One Track</a></option>
    <option role="presentation" value="instrumental-album"><a role="menuitem" tabindex="-1" href="#">Instrumental Album</a></option>
    <option role="presentation" value="remix"><a role="menuitem" tabindex="-1" href="#">Song Remix</a></option>
    <option role="presentation" value="livesong"><a role="menuitem" tabindex="-1" href="#">Song Performed Live</a></option>
    <option role="presentation" value="improv"><a role="menuitem" tabindex="-1" href="#">Freestyle / Improvization</a></option>
    <option role="presentation" value="liveset"><a role="menuitem" tabindex="-1" href="#">Set / Concert Performed Live</a></option>
    <option role="presentation" value="playlist"><a role="menuitem" tabindex="-1" href="#">Mix / Dj Set / Playlist</a></option>
    <option role="presentation" value="preview"><a role="menuitem" tabindex="-1" href="#">Preview / Teaser / Snippet</a></option>
    <option role="presentation" value="skit"><a role="menuitem" tabindex="-1" href="#">Intro / Interlude / Skit / Outro</a></option>
    <option role="presentation" value=""><a role="menuitem" tabindex="-1" href="#">Something Else Entirely.</a></option>

  </select>





<input id="submit-music-btn" type="submit" class="btn btn-primary btn-round" value="Post Song" />

</div><!-- End select DIV -->

</form>

<span id="add-music-steem-opt" class="labelOne">

</span>
