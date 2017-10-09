var WHBrawl = WHBrawl || {};

WHBrawl.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

WHBrawl.game.state.add('Boot', WHBrawl.Boot);
//uncomment these as we create them through the tutorial
WHBrawl.game.state.add('MainMenu', WHBrawl.MainMenu);
WHBrawl.game.state.add('Game', WHBrawl.Game);

WHBrawl.game.state.start('Boot');