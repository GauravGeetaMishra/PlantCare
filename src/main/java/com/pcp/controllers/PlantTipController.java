package com.pcp.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.pcp.services.PlantTipService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PlantTipController {

  //  private final PlantTipService plantTipService;
    private final RestTemplate restTemplate;

//    @GetMapping("/plant-tip")
//    public String getPlantTip() {
//        return plantTipService.getPlantTip();
//    }
    @GetMapping("/plant-tip")
    public Object getPlantTip() {
        try {
            String url = "https://houseplant-api.herokuapp.com/api/plants/Monstera";
            return restTemplate.getForObject(url, Object.class);
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("error", e.getMessage());
        }
    }
}
