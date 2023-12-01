package com.AtxHappyHour.Service;

import com.AtxHappyHour.Model.HappyHourDetails;
import com.AtxHappyHour.Model.Restaurant;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantService {
    private final List<Restaurant> restaurants;


    public RestaurantService() {
        this.restaurants = readRestaurantsFromCSV();
    }

    public List<Restaurant> getAllRestaurantLocations() {
        return restaurants;
    }

    public List<Restaurant> searchRestaurantsByName(String name) {
        // Implement your search logic here based on the 'restaurants' list
        // Example: Filter the 'restaurants' list by name and return matching results
        return restaurants.stream()
                .filter(restaurant -> restaurant.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();
    }

    private List<Restaurant> readRestaurantsFromCSV() {
        List<Restaurant> restaurants = new ArrayList<>();
        try (InputStream inputStream = getClass().getResourceAsStream("/restaurants.csv")) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

            String line;
            boolean headerLine = true;
            while ((line = reader.readLine()) != null) {
                if (headerLine) {
                    headerLine = false;
                    continue;
                }
                String[] data = line.split(",");

                if (data.length >= 5) {
                    String name = data[0];
                    Double latitude = Double.parseDouble(data[1]);
                    Double longitude = Double.parseDouble(data[2]);
                    String timeFrame = data[3];
                    String menuItems = data[4];

                    HappyHourDetails happyHourDetails = new HappyHourDetails(timeFrame, menuItems);
                    Restaurant restaurant = new Restaurant(name, latitude, longitude, happyHourDetails);
                    restaurants.add(restaurant);
                }
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return restaurants;
    }
}