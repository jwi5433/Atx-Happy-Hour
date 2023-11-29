package com.AtxHappyHour.Controller;

import com.AtxHappyHour.Model.Restaurant;
import com.AtxHappyHour.Service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:3000")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public List<Restaurant> getAllRestaurantLocations() {
        return restaurantService.getAllRestaurantLocations();
    }

    @GetMapping("/{id}")
    public Optional<Restaurant> getRestaurantById(@PathVariable Long id) {
        return restaurantService.getRestaurantById(id);
    }

    @GetMapping("/search")
    public List<Restaurant> searchRestaurantsByName(@RequestParam String name) {
        return restaurantService.searchRestaurantsByName(name);
    }

}