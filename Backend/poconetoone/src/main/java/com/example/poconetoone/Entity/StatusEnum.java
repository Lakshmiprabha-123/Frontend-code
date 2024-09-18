package com.example.poconetoone.Entity;

public enum StatusEnum {
    NOT_YET(0),
    IN_PROGRESS(0.5),
    COMPLETED(1),
    NOT_NECESSARY(0);

    private final double value;

    StatusEnum(double value) {
        this.value = value;
    }

    public double getValue() {
        return value;
    }
}
