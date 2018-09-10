#!/bin/sh
# wait-for-mysql.sh

set -e

cmd="$@"

until mysql -h "$MYSQL_HOST" -u "$MYSQL_USER" -p$MYSQL_PASSWORD $MYSQL_DATABASE -e '\q'; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing command"
exec $cmd

