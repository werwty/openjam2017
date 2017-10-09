var WHBrawl = WHBrawl || {};

WHBrawl.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
WHBrawl.Boot.prototype = {
  preload: function() {
        this.load.image('startmenu', 'assets/startmenu.png');

        this.load.image('whitehouse', 'assets/whitehouse.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('ground', 'assets/ground.png');

        this.load.spritesheet('trump', './assets/trump.png', 40, 40);
        this.load.spritesheet('trump-1', './assets/trump-1.png', 40, 40);
        this.load.spritesheet('trump-2', './assets/trump-2.png', 40, 40);
        this.load.spritesheet('trump-3', './assets/trump-3.png', 40, 40);
        this.load.spritesheet('trump-4', './assets/trump-4.png', 40, 40);


        this.load.image('twit', './assets/twit.png');

        this.load.spritesheet('hrc', './assets/hrc.png', 40, 40);
        this.load.spritesheet('hrc-1', './assets/hrc-1.png', 40, 40);
        this.load.spritesheet('hrc-2', './assets/hrc-2.png', 40, 40);
        this.load.spritesheet('hrc-3', './assets/hrc-3.png', 40, 40);
        this.load.spritesheet('hrc-4', './assets/hrc-4.png', 40, 40);


        this.load.image('mail', './assets/mail.png');
        this.load.image('volume', './assets/speaker.png');
        this.load.image('mute', './assets/mute.png');

        this.load.audio('bgm', ['assets/bgm.ogg']);
        this.load.audio('tweetsound', ['assets/tweet.ogg']);
        this.load.audio('jump', ['assets/jump.wav']);
        this.load.audio('mailsound', ['assets/mail.wav']);
                this.load.audio('victorysound', ['assets/victory.wav']);


  },
  create: function() {

	//physics system for movement
	this.game.physics.startSystem(Phaser.Physics.ARCADE);

  	this.state.start('MainMenu');
  }
};