module.exports = {
    presets: [
      [
        'env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      'stage-3',
      'react',
    ],
    ignore: ['node_modules', 'build'],
  };