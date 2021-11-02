#!/bin/bash
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

env=prod

while getopts e:c: flag
do
    case "${flag}" in
        e) env=${OPTARG};;
        c) cmd=${OPTARG};;
    esac
done

docker-compose -f $SCRIPTPATH/../docker/docker-compose.export."$env".yml "$cmd"