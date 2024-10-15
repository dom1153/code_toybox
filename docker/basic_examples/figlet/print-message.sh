#!/usr/bin/env bash
# define an array of catchphrases
PHRASES=("ITS A TRAP" "I am your father" "I find your lack of faith disturbing")

# randomly select a phrase
RANDOM_INDEX=$((RANDOM % ${#PHRASES[@]}))
SELECTED_PHRASE=${PHRASES[$RANDOM_INDEX]}

# print the message with figlet
figlet -w 200 -f starwars "$SELECTED_PHRASE"
