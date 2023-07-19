#!/usr/bin/env bash
# exit on error
set -o errexit

pipenv install
npm install
npm run-script ng build

pipenv run python manage.py migrate
pipenv run python manage.py collectstatic --no-input
pipenv run python manage.py add_superuser