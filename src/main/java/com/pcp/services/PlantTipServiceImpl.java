package com.pcp.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlantTipServiceImpl implements PlantTipService {
	 private final RestTemplate restTemplate;
	 
	 
	@Override
	public String getPlantTip() {
		 return restTemplate.getForObject("https://catfact.ninja/fact", String.class);
	}

}
