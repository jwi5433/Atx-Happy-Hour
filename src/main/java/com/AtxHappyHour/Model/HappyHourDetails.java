package com.AtxHappyHour.Model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class HappyHourDetails {
    private String timeFrame;
    private String menuItems;
}
