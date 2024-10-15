### get ubuntu from dockerhub
FROM ubuntu:latest

### run commands on machine
RUN apt-get update && apt-get install -y figlet wget
RUN wget http://www.jave.de/figlet/fonts/details/starwars.flf -O /usr/share/figlet/starwars.flf

### place file into docker image
COPY print-message.sh /print-message.sh
RUN chmod +x /print-message.sh

### default command (run the copied script)
CMD ["/print-message.sh"]
