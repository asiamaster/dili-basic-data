package com.dili.bd;


import com.dili.ss.dto.DTOScan;
import com.dili.ss.retrofitful.annotation.RestfulScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = {"com.dili.assets.sdk.rpc", "com.dili.bd.rpc", "com.dili.logger.sdk.rpc"})
@ComponentScan(basePackages={"com.dili.ss", "com.dili.bd", "com.dili.uap.sdk", "com.dili.logger.sdk"})
@RestfulScan({"com.dili.bd.rpc","com.dili.uap.sdk.rpc"})
@DTOScan(value={"com.dili.assets.sdk.dto"})
public class BDApplication extends SpringBootServletInitializer {

	@LoadBalanced
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	public static void main(String[] args) {
		SpringApplication.run(BDApplication.class, args);
	}


}
