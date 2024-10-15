FROM ubunut:latest
RUN apt-get update && apt-get install -y coffee-maker
COPY . /coffee-recipe
RUN ./prepare-beans.sh
CMD ["./brew-coffee.sh"]
