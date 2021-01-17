### Introduction

Packtrack is a command line tool the helps you track all of your packages in a single place.

Instead of checking Amazon or other retailers for the status of your packages, simply add their tracking numbers to Packtrack and get the latest updates with a single command.


### First Steps

You'll need a free API key from [Aftership](https://www.aftership.com) in order to use the application.

### Setup
1. Clone the project: `git clone https://github.com/jsrath/packtrack.git`
2. Run the following commands:
```shell
cd packtrack
npm install
npm run build
npm link
```
3. Create a `.env` file inside the parent directory and add an `API_KEY` variable: `API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### Usage

You can run `packtrack --help` or `packtrack -h` at any time to view the help menu.

#### View All of the Packages You're Currently Tracking
```sh
packtrack
```

#### View a Specific Package
```sh
packtrack <tracking number>
```

#### Add a Package to Track
Use the following command to begin tracking a package:
```sh
packtrack --add --courier <courier> <tracking number>
```

In many cases you may not know the exact name of the courier. Please see the [Couriers](#couriers) section for more information on getting the correct courier name.

#### Remove a Package from Tracking
```sh
packtrack --remove <tracking number>
```

#### Couriers
To get a list of supported couriers use:
```sh
packtrack --list
```

If you know the name (or partial name) of the courier, enter it as an argument to the `--list` command:
```sh
packtrack --list <courier>
```
