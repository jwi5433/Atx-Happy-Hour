package com.AtxHappyHour.Controller;

import com.AtxHappyHour.Model.Restaurant;
import com.AtxHappyHour.Service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public List<Restaurant> getAllRestaurantLocations() {
        return restaurantService.getAllRestaurantLocations();
    }

    @GetMapping("/searchByName")
    public ResponseEntity<?> searchRestaurantsByName(@RequestParam String name) {
        try {
            List<Restaurant> results = restaurantService.searchRestaurantsByName(name);
            return ResponseEntity.ok(results);
        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }



}