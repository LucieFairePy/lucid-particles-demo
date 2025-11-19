const CONFIG = {
  text: {
    content: 'Lucifer.exe',
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },

  particle: {
    colors: [
      '#4aa3ff',  // Primary blue
      '#6eb5ff',  // Light blue
      '#3d8fd1',  // Dark blue
      '#88c9ff',  // Lighter blue
      '#2d7ab8'   // Deeper blue
    ],
    minSize: 1,
    maxSize: 6,
    dpi: 200,  // Density of particles (higher = less particles)
    
    friction: {
      min: 0.90,
      max: 0.95
    },
    velocity: {
      multiplier: 100
    },
    mouseRepulsion: {
      enabled: true,
      distance: 15  // divisor of canvas width (cw/15)
    }
  },

  scene: {
    backgroundColor: '#ffffff',
    fadeOnScroll: true,
    fadeLimit: {
      mobile: {
        portrait: 0.12,   // 12% of scroll height
        landscape: 0.8    // 80% of scroll height
      },
      desktop: 0.5        // 50% of scroll height
    }
  },
  
  personal: {
    // Basic Information
    name: 'Lucifer.exe',
    username: 'Lucifer.py',
    discriminator: '',  // Leave empty for new Discord usernames (no #0000)
    avatar: 'https://cdn.discordapp.com/avatars/764969898538696716/70d4f92735e19c9664d9397441a3c61a.webp?size=128',
    banner: './assets/img/banner.gif',    
    customBadge: '',  // e.g., 'Bot', 'Random guy', 'Developer' - leave empty to hide
    
    bio: 'Web Developer & Game Enthusiast<br><br>Passionate about creating interactive experiences and running servers.',
    
    discord: 'Lucifer.py',
    github: 'https://github.com/LucieFairePy',
    portfolio: 'https://github.com/LucieFairePy/particle-animation',  // Link for "View on GitHub" button
    
    memberSince: 'Oct 11, 2020',
    
    note: 'Creator of awesome particle animations!',

    // ========================================
    // BADGES CONFIGURATION
    // ========================================
    // Available Sybrax badges (use the webp filename without extension):
    // - 'bravery' : HypeSquad Bravery
    // - 'brilliance' : HypeSquad Brilliance (if you have the file)
    // - 'balance' : HypeSquad Balance (if you have the file)
    // - 'nitro' : Discord Nitro
    // - 'boost' : Server Boosting
    //
    // Custom badges with image URL:
    // - { type: 'custom', image: 'url-to-image.png', tooltip: 'Custom Badge' }
    //
    badges: [
      'bravery',
      'nitro',
      'boost'
    ],

    // ========================================
    // ROLES CONFIGURATION
    // ========================================
    // To add/remove roles, modify the array below
    // Each role has:
    // - name: Role display name
    // - color: Hex color code (use Discord's role colors)
    //
    // Common Discord role colors:
    // - '#5865F2' : Blurple
    // - '#57F287' : Green
    // - '#FEE75C' : Yellow
    // - '#EB459E' : Pink
    // - '#ED4245' : Red
    // - '#99AAB5' : Grey
    // - '#FFA500' : Orange
    // - '#9B59B6' : Violet
    // - '#1ABC9C' : Turquoise
    // - '#9ACD32' : Yellow Green
    //
    roles: [
      { name: '👑 Owner', color: '#f04747' },
      { name: '💻 Developer', color: '#5865F2' },
      { name: '🎮 Gamer', color: '#43b581' },
      { name: '🌟 Nitro Booster', color: '#f47fff' },
      { name: '📚 Community Member', color: '#99aab5' }
    ]
  }
};
