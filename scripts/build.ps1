yarn build
mkdir artifacts > $null
npm pack --pack-destination .\artifacts\
cd .\artifacts
mv next-worker* next-worker.tgz
cd ..\test\e2e\
npm uninstall next-worker
npm install ..\..\artifacts\next-worker.tgz
rm -r -Force .next 2> $null
cd ..\..
rm -r artifacts
