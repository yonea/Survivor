window.onload = init;

var assetsToLoadURLs = {
    personnage: { url: './assets/personnage.png' },
    cheval: { url: './assets/cheval.png' },
    fond: { url: './assets/fond.jpg' },
    audio: {url: './assets/gunjs.mp3' , buffer: false, loop: false, volume: 0.6 },
    fond2: { url: './assets/fond2.png' },
    logords: { url: './assets/rdsurvivor_logo.png' },
    audiofond: {url: './assets/windjs.mp3' , buffer: false, loop: true, volume: 0.1 },
    audiomus: {url: './assets/musiquejs.mp3' , buffer: false, loop: true, volume: 0.8 },
    audiomus2: {url: './assets/musiquejspause.mp3' , buffer: false, loop: true, volume: 0.8 },
    audiosound1: {url: './assets/sound1js.mp3' , buffer: false, loop: false, volume: 0.4 },
    douille : { url: './assets/douille.png' },
	audiorecharger: {url: './assets/son_recharger.mp3' , buffer: false, loop: false, volume: 0.4 },
	toucheR : { url: './assets/touche_R.png' },
    fond3 : { url: './assets/fond3.jpg' },
    zombie1 : { url: './assets/zombie1.png' },
    zombie2 : { url: './assets/zombie2.png' },
    zombie3 : { url: './assets/zombie3.png' },
    zombie4 : { url: './assets/zombie4.png' },
	fondtransparent1: { url: './assets/fondtransparent1.png' },
	fondtransparent2: { url: './assets/fondtransparent2.png' },
    exit: {url: './assets/exit.png' },
    fondZombie: { url: './assets/fondZombie.jpg' },
    play: {url: './assets/play.png' },
	youdied : {url: './assets/youdied.png' },
	win : {url: './assets/win.png' }



};

var loadedAssets;

function init() {
    // this call will load all assets
    console.log("Loading assets...");
  //document.body.innerHTML += "<p>Loading assets...</p>";
    loadAssets(startGame);
}

function startGame(assetsReadyToBeUsed) {
    console.log("IMAGES, SOUNDS, MUSICS READY TO BE USED!");
  //document.body.innerHTML += "<p>IMAGES, SOUNDS, MUSICS READY TO BE USED!</p>";
  // We're ready to use all sounds, images, musics etc
  loadedAssets = assetsReadyToBeUsed;

  demarerJeu();
}


//==========================

function loadAssets(callback) {
    // here we should load the sounds, the sprite sheets etc.
    // then at the end call the callback function           
    loadAssetsUsingHowlerAndNoXhr(assetsToLoadURLs, callback);
}

// You do not have to understand in details the next parts of the code...
// just use the above function

/* ############################
    BUFFER LOADER for loading multiple files asyncrhonously. The callback functions is called when all
    files have been loaded and decoded 
 ############################## */
function isImage(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function isAudio(url) {
    return (url.match(/\.(mp3|ogg|wav)$/) != null);
}

function loadAssetsUsingHowlerAndNoXhr(assetsToBeLoaded, callback) {
    var assetsLoaded = {};
    var loadedAssets = 0;
    var numberOfAssetsToLoad = 0;

    // define ifLoad function
    var ifLoad = function () {
        if (++loadedAssets >= numberOfAssetsToLoad) {
            callback(assetsLoaded);
        }
        console.log("Loaded asset " + loadedAssets);
    };

    // get num of assets to load
    for (var name in assetsToBeLoaded) {
        numberOfAssetsToLoad++;
    }

    console.log("Nb assets to load: " + numberOfAssetsToLoad);

    for (name in assetsToBeLoaded) {
        var url = assetsToBeLoaded[name].url;
        console.log("Loading " + url);
        if (isImage(url)) {
            assetsLoaded[name] = new Image();

            assetsLoaded[name].onload = ifLoad;
            // will start async loading. 
            assetsLoaded[name].src = url;
        } else {
            // We assume the asset is an audio file
            console.log("loading " + name + " buffer : " + assetsToBeLoaded[name].loop);
            assetsLoaded[name] = new Howl({
                urls: [url],
                buffer: assetsToBeLoaded[name].buffer,
                loop: assetsToBeLoaded[name].loop,
                autoplay: false,
                volume: assetsToBeLoaded[name].volume,
                onload: function () {
                    if (++loadedAssets >= numberOfAssetsToLoad) {
                        callback(assetsLoaded);
                    }
                    console.log("Loaded asset " + loadedAssets);
                }
            }); // End of howler.js callback
        } // if

    } // for
} // function