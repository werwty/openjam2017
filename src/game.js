var WHBrawl = WHBrawl || {};

var twitTime = 0;
    var mailTime = 0;
    var hrcdirection = 1;
    var djtdirection = -1;
    var hrcactive=true
var djtactive=true
//title screen
WHBrawl.Game = function(){};

WHBrawl.Game.prototype = {
  create: function() {
        tweetsound = this.game.add.audio('tweetsound');
        jump = this.game.add.audio('jump');
        mailsound = this.game.add.audio('mailsound');
        victorysound = this.game.add.audio('victorysound');

        //volumebutton = this.game.add.button(200, this.game.world.height - 500, 'volume', muteClick, this);

        music = this.game.add.audio('bgm');
        music.loop = true;

        music.play();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.sprite(0, 0, 'whitehouse');

        //  The platforms group contains the ground and the ledges
        platforms = this.game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, this.game.world.height - 16, 'ground');
        ground.body.immovable = true;

        for (var i=0; i<5; i++){

            rand1=Math.floor(Math.random() * 800) -200
            rand2=Math.floor(Math.random()*20)

            var platform0 = platforms.create(rand1, this.game.world.height - (i+1)*90-rand2, 'platform');
            platform0.body.checkCollision.down = false;
            platform0.body.checkCollision.left = false;
            platform0.body.checkCollision.right = false;

            platform0.body.immovable = true;
        }



        djt = this.game.add.sprite(750, this.game.world.height - 50, 'trump');
        this.game.physics.arcade.enable(djt);

        djt.body.bounce.y = 0.2;
        djt.body.gravity.y = 800;
        djt.animations.add('idle', [0, 2], 4, true);
        djt.animations.add('walk', [0, 1], 4, true);
        djt.animations.add('fire', [0, 4], 4, true);
                djt.animations.add('victory', [0, 3], 4, true);

        djt.anchor.set(0.5, 0.5);
        djt.scale.x = djtdirection;
        djt.health = 100;

        // set the default hurtbox
        djt.body.setSize(30, 40, 0, 0);

        hrc = this.game.add.sprite(40, this.game.world.height - 50, 'hrc');
        this.game.physics.arcade.enable(hrc);

        hrc.body.bounce.y = 0.2;
        hrc.body.gravity.y = 800;
        hrc.animations.add('idle', [0, 1], 4, true);
        hrc.animations.add('walk', [0, 2], 4, true);
        hrc.animations.add('fire', [0, 3], 4, true);
                hrc.animations.add('victory', [0, 4], 4, true);

        hrc.anchor.set(0.5, 0.5);
        hrc.scale.x = hrcdirection;
        hrc.health = 100;
        hrc.body.setSize(30, 40, 0, 0);


        twits = this.game.add.weapon(-1, 'twit');
        twits.bulletSpeed = -djtdirection * 200;
        twits.fireRate = 500;
        twits.bulletWorldWrap = true;
        twits.trackSprite(djt, 0, 0, false);
        twits.bulletKillType = Phaser.Weapon.KILL_NEVER;

        mails = this.game.add.weapon(-1, 'mail');
        mails.bulletSpeed = hrcdirection * 200;
        mails.fireRate = 500;
        mails.bulletWorldWrap = true;
        mails.trackSprite(hrc, 0, 0, false);
        mails.bulletKillType = Phaser.Weapon.KILL_NEVER;

        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);


        this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.DOWN,
            Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.W, Phaser.Keyboard.S]);


        djt.health = 100;
        djt.maxHealth = 100;

        var barConfig0 = {
            width: 400,
            height: 40,
            x: 600,
            y: 0,
            bg: {
                color: '#FFFFFF'
            },
            bar: {
                color: '#ffae00'
            }, flipped: true
        };
        djtHealth = new HealthBar(this.game, barConfig0);

        var barConfig1 = {
            width: 400,
            height: 40,
            x: 200,
            y: 0,
            bg: {
                color: '#FFFFFF'
            },
            bar: {
                color: '#0050ff'
            },
        };
        hrcHealth = new HealthBar(this.game, barConfig1);
  },
  update: function() {
        this.game.world.wrap(djt, 0, true);
        this.game.world.wrap(hrc, 0, true);

        //game.world.wrap(bullets, 0, true);

        var hitPlatformDJT = this.game.physics.arcade.collide(djt, platforms);
        djt.body.velocity.x = 0;

        var hitPlatformHRC = this.game.physics.arcade.collide(hrc, platforms);
        hrc.body.velocity.x = 0;
if(djtactive) {
    //DJT mvmt
    if (this.leftKey.isDown) {
        djt.body.velocity.x = -150;
        djtdirection = -1;
        djt.scale.x = djtdirection;

        djt.animations.play('walk');
    }
    else if (this.rightKey.isDown) {
        //  Move to the right
        djt.body.velocity.x = 150;
        djtdirection = 1;
        djt.scale.x = djtdirection;

        djt.animations.play('walk');
    }
    else if (this.downKey.isDown) {
        if (this.game.time.now > twitTime) {
            tweetsound.play()
            djt.animations.play('fire');

            if (djtdirection == 1) {
                twits.fireAngle = Phaser.ANGLE_RIGHT;
            } else {
                twits.fireAngle = Phaser.ANGLE_LEFT;
            }

            twits.fireOffset(djtdirection * 30, 0);
            twitTime = this.game.time.now + 500;

        }

    }
    else {
        //  Stand still
        djt.animations.play('idle');

        //player.frame = 4;
    }


    //  Allow the player to jump if they are touching the ground.
    if (this.upKey.isDown && djt.body.touching.down && hitPlatformDJT) {
        djt.body.velocity.y = -400;
        jump.play()
    }
}
        if(hrcactive) {
            if (this.aKey.isDown) {
                hrc.body.velocity.x = -150;
                hrcdirection = -1;
                hrc.scale.x = hrcdirection;

                hrc.animations.play('walk');
            }
            else if (this.dKey.isDown) {
                //  Move to the right
                hrc.body.velocity.x = 150;
                hrcdirection = 1;
                hrc.scale.x = hrcdirection;

                hrc.animations.play('walk');
            }
            else if (this.sKey.isDown) {
                if (this.game.time.now > mailTime) {
                    hrc.animations.play('fire');
                    mailsound.play()
                    if (hrcdirection == 1) {
                        mails.fireAngle = Phaser.ANGLE_RIGHT;
                    } else {
                        mails.fireAngle = Phaser.ANGLE_LEFT;
                    }

                    mails.fireOffset(hrcdirection * 30, 0);
                    mailTime = this.game.time.now + 500;

                }

            }
            else {
                //  Stand still
                hrc.animations.play('idle');
            }


            //  Allow the player to jump if they are touching the ground.
            if (this.wKey.isDown && hrc.body.touching.down && hitPlatformHRC) {
                hrc.body.velocity.y = -500
                jump.play()
            }
        }

        this.game.physics.arcade.overlap(djt, twits.bullets, friendlyCollision, null, this);
        this.game.physics.arcade.overlap(hrc, mails.bullets, friendlyCollision, null, this);

        this.game.physics.arcade.overlap(twits.bullets, mails.bullets, bulletCollision, null, this);

        this.game.physics.arcade.overlap(djt, hrc, characterCollision, null, this);

        this.game.physics.arcade.overlap(hrc, twits.bullets, hrcDamage, null, this);
        this.game.physics.arcade.overlap(djt, mails.bullets, djtDamage, null, this);
  },
};





    function friendlyCollision(djt, bullet) {
        //  kill the bullet
        bullet.kill();
    }

    function bulletCollision(bullet1, bullet2) {
        //  kill the bullets
        bullet1.kill();
        bullet2.kill();
    }

    function characterCollision(djt, hrc) {
        djt.body.velocity.x = 0
        hrc.body.velocity.x = 0

    }

    function hrcDamage(hrc, bullet) {
        bullet.kill();
        hrc.damage(15);
if(hrc.health <=0){
              djtactive =false;
            victorysound.play()
                        djt.animations.play('victory', 4, true);
    sleep(8000).then(() => {
                      djtactive =true;

        this.game.state.start('MainMenu', true, false);
    });
}
         else if (hrc.health <= 20) {
            hrc.loadTexture('hrc-4')
        }
        else if (hrc.health <= 40) {
            hrc.loadTexture('hrc-3')

        }
        else if (hrc.health <= 60) {
            hrc.loadTexture('hrc-2')

        }
        else if (hrc.health <= 80) {
            hrc.loadTexture('hrc-1')

        }
        hrcHealth.setPercent(hrc.health);

    }


    function djtDamage(djt, bullet) {
        bullet.kill();


        djt.damage(10);

        if(djt.health<=0){

            hrcactive =false;
            victorysound.play()
                        hrc.animations.play('victory', 4, true);
    sleep(8000).then(() => {
                    hrcactive =true;

        this.game.state.start('MainMenu', true, false);
    });

        }
        else if (djt.health <= 20) {
            djt.loadTexture('trump-4')
        }
        else if (djt.health <= 40) {
            djt.loadTexture('trump-3')

        }
        else if (djt.health <= 60) {
            djt.loadTexture('trump-2')

        }
        else if (djt.health <= 80) {
            djt.loadTexture('trump-1')

        }
        djtHealth.setPercent(djt.health);

    }

    function muteClick() {

        if (this.game.sound.mute) {
            this.game.sound.mute = false;
            volumebutton.loadTexture('volume', 0);

        } else {
            this.game.sound.mute = true;
            volumebutton.loadTexture('mute', 0);
        }
    }


    function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}