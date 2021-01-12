#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import App from './ui/ui';
import meow from 'meow';

const cli = meow(
  `
	Usage: 
		trackpack [options] [tracking number]

	Options
		-a, --add			Add a package to track
		-r, --remove	Remove a package from tracking

	Examples
		trackpack 20934234234
		trackpack --add 20934234234
		trackpack --remove 20934234234
	`,
  {
    flags: {
      add: {
        type: 'boolean',
        default: false,
        alias: 'a',
      },
      remove: {
        type: 'boolean',
        default: false,
        alias: 'r',
      },
    },
  },
);

render(<App add={cli.flags.add} remove={cli.flags.remove} trackingNumber={cli.input[0]} />);
