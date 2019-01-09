# 6hSkip

# How to use script
1) Modify the name, password, and gameId variables to match your username, password, and gameId.
2) Download this script (or clone the project) on a server of your choice, in a folder of your choice.
i.e.: <code>mkdir blight && cd blight && git clone URL</code>
3) Download <a href="https://nodejs.org/en/">nodejs</a>
4) In the directory that contains the file, install all dependencies <code>npm i</code>
5) If this is a linux server, simply use <code>crontab -e</code> to enter cron configurations
6) Add these two lines to run the script at 14:00 UTC (8:00 CST) and 4:00 UTC (22:00 CST)  

<code>0 14 * * * /usr/bin/node /home/YOUR-USER/blight/blight.js</code>  
<code>0 4 * * * /usr/bin/node /home/YOUR-USER/blight/blight.js</code>

7) Celebrate!
