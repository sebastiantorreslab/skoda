package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;



@EntityScan
@ComponentScan
@SpringBootApplication
public class SkodaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkodaApplication.class, args);
		System.out.println("skoda app working");
	}

}
