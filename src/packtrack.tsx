#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import Trackings from './ui/trackings';
import Couriers from './ui/couriers';
import meow from 'meow';

const cli = meow(
  `
  Usage: 
    packtrack [options] [courier] [tracking number]

  Options
    -a, --add       Add a package to track
    -r, --remove    Remove a package from tracking
    -c, --courier   Name of the company shipping your package 

  Examples
    packtrack 20934234234
    packtrack --add 20934234234 --courier fedex
    packtrack --remove 20934234234
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
      courier: {
        type: 'string',
        default: '',
        alias: 'c',
      },
      list: {
        type: 'boolean',
        default: false,
        alias: 'l',
      },
    },
  },
);

cli.flags.list
  ? render(<Couriers searchTerm={cli.input[0]} />)
  : render(
      <Trackings
        add={cli.flags.add}
        remove={cli.flags.remove}
        courier={cli.flags.courier}
        trackingNumber={cli.input[0]}
      />,
    );
