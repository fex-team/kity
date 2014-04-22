setlocal EnableDelayedExpansion
del /q /s .\coverage\json_files\*.json
cd ../
for /f %%p in ('grunt ') do set gruntRe=%%p
cd spec
for /f %%j in ('karma start ./karma.conf.js') do set karmaRe=%%j
for /f  %%i in ('node ./mergeCoverageForIstanbul.js') do set re=%%i
istanbul report html coverage/json_files/%re%.json
