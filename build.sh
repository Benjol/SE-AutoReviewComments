#!/bin/sh

case $(getconf LONG_BIT) in
    64)
        ant -Darch=64 "$@"
        ;;
    *)
        ant "$@"
        ;;
esac
