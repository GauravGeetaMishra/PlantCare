package com.pcp;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableAspectJAutoProxy
public class PlantCarePlannerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlantCarePlannerApplication.class, args);
	}
	@Bean
	ModelMapper modelMapper() {
	    ModelMapper mapper = new ModelMapper();
	    mapper.getConfiguration()
	            .setMatchingStrategy(MatchingStrategies.STRICT)
	            .setPropertyCondition(Conditions.isNotNull());
	    return mapper;
	}

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
