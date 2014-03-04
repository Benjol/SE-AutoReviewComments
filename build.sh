#!/bin/sh

# The Windows git bash environment doesn't have getconf, but
# it's safe to assume that if we don't have the command that
# we don't need to pass anything special to ant. Likewise the
# ant build target assumes 32 bit unless told otherwise.
case $(hash getconf 2>/dev/null && getconf LONG_BIT) in
    64)
        ant -Darch=64 "$@"
        ;;
    *)
        ant "$@"
        ;;
esac
