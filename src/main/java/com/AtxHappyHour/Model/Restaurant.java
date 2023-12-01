package com.AtxHappyHour.Model;
import lombok.Data;

@Data
public class Restaurant {
    private String name;
    private Double latitude;
    private Double longitude;
    private HappyHourDetails happyHourDetails;

    public Restaurant(String name, Double latitude, Double longitude, HappyHourDetails happyHourDetails) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.happyHourDetails = happyHourDetails;
    }

    public String getName() {
        return name;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public HappyHourDetails getHappyHourDetails() {
        return happyHourDetails;
    }
}