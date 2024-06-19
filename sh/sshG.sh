#!/usr/bin/env bash

### ./sshG.sh foo-server
### https://www.youtube.com/watch?v=xCX14u9XzE8
### technically untested ;)

### reads existing ssh config for a server, generate a key, upload it to the server

name="$1"
host_config=$(ssh -G "$name")

value_of() {
	echo "$host_config" | grep -E "^$1" | cut -d' ' -f2
}

# user=$(echo "$host_config" | grep -E "^user" | cut -d' ' -f2)
# hostname=$(echo "$host_config" | grep -E "^hostname" | cut -d' ' -f2)
# identityfile=$(echo "$host_config" | grep -E "^identityfile" | cut -d' ' -f2)

user=$(value_of "user")
hostname=$(value_of "hostname")
### replace ~ with $HOME for ssh
identityfile=$(value_of "identityfile" | sed "s#^~#$HOME#")

ssh-keygen -t ed25519 -f "$identityfile" -q -N ""
ssh-copy-id -i "$identityfile.pub" "$user@$hostname"
