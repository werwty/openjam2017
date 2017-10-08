// The player and its settings
    //player = game.add.sprite(160, game.world.height - 180, 'trump');
Trump = function(game, x, y, name) {
    //instantiate the sprite
    Phaser.Sprite.call(this, game, x, y, name);

    //enable its physics body
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.setSize(160, 160, 0, 0);
    this.anchor.setTo(0.5, 0.5);
    this.body.bounce.y = 0.1;
    this.body.gravity.y = 1000;

    this.rando = Math.floor(Math.random() * 300);


    this.inputEnabled = true

    this.body.allowGravity = true;

    this.animations.add('idle', [0, 2], 4, true);
    this.animations.add('walk', [0,1], 4, true);
    this.animations.add('melee', [0,4,5], 4, true);

    this.health = 100;
    this.special = 0;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.melee = game.input.keyboard.addKey(Phaser.Keyboard.M)

    this.flinch = false;
};

Trump.prototype = Object.create(Phaser.Sprite.prototype);
Trump.prototype.constructor = Trump;


Trump.prototype.update = function() {


    this.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.body.velocity.x = -150;

        this.animations.play('walk');
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.body.velocity.x = 150;

        this.animations.play('walk');
    }
    else
    {
        //  Stand still
        this.animations.play('idle');

    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.body.touching.down )
    {
        this.body.velocity.y = -350;
    }

    if(this.melee && !this.flinch){
        //this.animations.play('melee')
    }

};



Trump.prototype.PlayAnim = function(name) {
    if(this.animations.currentAnim.name !== name)
        this.animations.play(name);
};

Trump.prototype.Idle = function() {
    this.PlayAnim('idle');
};


