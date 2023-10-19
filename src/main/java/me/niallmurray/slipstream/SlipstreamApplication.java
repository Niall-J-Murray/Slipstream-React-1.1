package me.niallmurray.slipstream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SlipstreamApplication {

  public static void main(String[] args) {
    SpringApplication.run(SlipstreamApplication.class, args);
  }

//  @Bean
//  public WebMvcConfigurer corsConfigurer() {
//    return new WebMvcConfigurer() {
//      @Override
//      public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/test-all-users").allowedOrigins("http://localhost:8080");
//      }
//    };
//  }
}
