package com.AtxHappyHour.Model;

import lombok.Data;

@Data
public class HappyHourDetails {
    private String timeFrame;
    private String menuItems;

    public HappyHourDetails(String timeFrame, String menuItems) {
        this.timeFrame = timeFrame;
        this.menuItems = menuItems;
    }
}