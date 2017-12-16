# Raspberry Pi, Firebase, firebase-queues, Angular presentation
Concepts behind my garage door opener

<a href="https://www.robusthaven.com/presentations/IoT-with-Raspberry-Pi-Firebase-Angular"
title="presentation and demo">
  <img src="https://raw.github.com/leblancmeneses/presentation-raspberrypi-firebase/master/demo.png" alt="demo" />
</a>

TODO(lmeneses): Eventually integrate a webcam to identify open or close.

This repo doesn't provide middleware for security or firebase-bolt for generating the rtdb rules file.


## From you main desktop/laptop:
1) Download raspbian with desktop image (img)
2) Download & install Etcher
3) Run Etcher to burn img onto sd card

## On Raspberry Pi after booting:
4) Preferences > Raspberry Pi Configuration
```
Localisation:
  set Locale  to  en, usa, utf-8
  set keyboard to usa, english
Interfaces:
  SSH * Enable   # Most important so you can login remotely
System:
  Change hostname: garagelargedoor   # Give a name to make it easy to identify on your network

reboot
```

5) Change password of pi user:
```
passwd      # Default is raspberry

sudo reboot
```
6) Connect to wifi


## From you main desktop/laptop:
1) transfer files:

from linux client:
  ```scp -r ./* pi@garagelargedoor:/home/pi/apps/garagedoor```

from windows client
  ```winscp and drag and drop the files into /home/pi/apps/garagedoor```

2) configure pi with ssh

from linux client:
  ```ssh pi@garagelargedoor```

from windows client: (use putty)
  Login as: pi
  password: whatever you set in passwd setup #5.




### setup node:
```
https://github.com/creationix/nvm

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.7/install.sh | bash

sudo reboot

nvm ls-remote
nvm install node
nvm install v6.12.2
```

#### set current shell
```
nvm use v6.12.2
```

#### set default node version 
```
nvm alias default v6.12.2

node -v
```

### extend the life of my sd card
http://www.zdnet.com/article/raspberry-pi-extending-the-life-of-the-sd-card/

https://raspberrypi.stackexchange.com/questions/169/how-can-i-extend-the-life-of-my-sd-card

https://narcisocerezo.wordpress.com/2014/06/25/create-a-robust-raspberry-pi-setup-for-24x7-operation/

```
sudo swapoff --all
sudo apt-get remove dphys-swapfile


sudo -s
vi /etc/fstab

tmpfs   /tmp    tmpfs    defaults,noatime,nosuid,size=100m    0 0
tmpfs   /var/log    tmpfs    defaults,noatime,nosuid,mode=0755,size=100m    0 0


mount -a

exit   # to leave sudo -s
```

### pm2 onboot or application crashes restart 
```
npm install -g pm2
pm2 startup # copy the command and paste in terminal
pm2 startup systemd -u pi

cd /home/pi/apps/garagedoor
npm install


pm2 start app.js --watch
pm2 save

sudo reboot

pm2 list
```

