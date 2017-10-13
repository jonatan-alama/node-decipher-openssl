#!/bin/bash

rm -rf test-file*

echo "mysecretext" > test1
openssl aes-256-cbc -e -pass pass:mysecret -in test1 -out test1.enc

openssl aes-256-cbc -e -pass pass:mysecret -in test2 -out test2.enc
openssl aes-256-cbc -e -pass pass:mysecret -in test3 -out test3.enc