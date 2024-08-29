# Scripts

This folder contains convenience scripts (wrappers) for editing this repo locally.

## Nix Package Scripts

If you are using the [nix](https://nixos.org/) packaging system.

You can run the server with the following command:

`./nix/serve.sh`

If you recieve an error from dotnet that retype is not installed, you can use

`./nix/nix-shell.sh`

to open a shell follow the dontet command to insure retype is installed locally.

## Non-Nix Scripts

`./sh/serve.sh`

Contains a wrapper call to run:

`dotnet tool run retype start`
