package ru.yakovlev05.cms.catalog.exception;

public class S3Exception extends RuntimeException{
    public S3Exception(String message) {
        super(message);
    }
}
