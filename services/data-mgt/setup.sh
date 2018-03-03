#!/bin/bash
  
# TODO: Need to put proper userid not root onto mysql
# EXPECTED_ARGS=3
# E_BADARGS=65
MYSQL=`which mysql`
  
Q1="CREATE DATABASE IF NOT EXISTS osprey;"
# Q2="GRANT USAGE ON *.* TO $2@localhost IDENTIFIED BY '$3';"
# Q3="GRANT ALL PRIVILEGES ON $1.* TO $2@localhost;"
# Q4="FLUSH PRIVILEGES;"
 SQL="${Q1}"
  
# if [ $# -ne $EXPECTED_ARGS/
  
$MYSQL -uroot -pmypass -hmaria_db -e "$SQL"
knex migrate:latest