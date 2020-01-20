#!/bin/sh

# If the sdk is used locally from its directory, npm will create a symlink, which the metro bundler can't handle.
# Instead, go indirectly through a tarball install

pushd ../sdk
npm pack
popd
rm -rf node_modules/didi-sdk
