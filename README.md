# Mobile

If you want to use an Android Studio emulator, you have to:
- navigate to AppData/Local/Android/Sdk/emulator directory and execute ".\emulator.exe -avd Pixel_6_API_34 -writable-system";
- go to AppData/Local/Android/Sdk/plateform-tools and execute ".\adb root" and ".\adb remount";
- execute ".\adb shell" command in AppData/Local/Android/Sdk/plateform-tools directory;
- edit the hosts file in /etc of the adb shell by usin vi and insert "10.0.2.2 goodfood.localdev.me"
- restart you emulator by using the first command
