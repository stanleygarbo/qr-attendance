# How to run via terminal/cmd

## Clone the project first

`git clone https://github.com/stanleygarbo/qr-attendance/`

## Install dependencies

Change your current directory first `cd qr-attendance`

run `npm install`

## To run the project

run `npm run dev`

After running the command above, go to `localhost:5173` on your browser

## Change firebase account

go to `src/config/firebase.ts` and change the values of the config file to match your firebase credentials.

## NOTES

Some models/collections require indexing to be enabled. you can enable it on your firebase dashboard. This is necessary if you want to sort the results of the firebase query.

https://firebase.google.com/docs/firestore/query-data/indexing#create_a_missing_index_through_an_error_message
