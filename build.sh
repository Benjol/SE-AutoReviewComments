#!/bin/sh

# Firefox SDK has not been ported to Python 3, so check if system
# has both 2 and 3 and use 2 specifically in case the system default
# has been set to 3. See:
# https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Troubleshooting#Check_Your_Python
PYTHON=$(command -v python2 || command -v python)

# The Windows git bash environment doesn't have getconf, but
# it's safe to assume that if we don't have the command that
# we don't need to pass anything special to ant. Likewise the
# ant build target assumes 32 bit unless told otherwise.
case $(hash getconf 2>/dev/null && getconf LONG_BIT) in
    64)
        ant -Darch=64 -Dpython2=$PYTHON "$@"
        ;;
    *)
        ant -Dpython2=$PYTHON "$@"
        ;;
esac
