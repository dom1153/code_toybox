#!/usr/bin/env bash
cd "$(dirname $0)"
cd ..

python manage.py runserver 0.0.0.0:8765
