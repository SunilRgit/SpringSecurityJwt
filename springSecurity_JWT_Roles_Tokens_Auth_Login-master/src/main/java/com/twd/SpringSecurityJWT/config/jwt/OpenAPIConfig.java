package com.twd.SpringSecurityJWT.config.jwt;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class OpenAPIConfig {
    @Value("${bezkoder.openapi.dev-url}")
    private String devUrl;

    @Value("${bezkoder.openapi.prod-url}")
    private String prodUrl;

    @Bean
    public OpenAPI myOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl(devUrl);
        devServer.setDescription("Server URL in Development environment");

        Server prodServer = new Server();
        prodServer.setUrl(prodUrl);
        prodServer.setDescription("Server URL in Production environment");

        Contact contact = new Contact();
        contact.setEmail("himanigoel@cdac.in");
        contact.setName("Himani Garg");
        //contact.setUrl("https://www.pasanabeysekara.com");

        License mitLicense = new License().name("MIT License").url("http://10.226.30.12:6060/auth/login");

        Info info = new Info()
                .title("महाराष्ट्र आरोग्य विज्ञान विद्यापीठ, नाशिक ")
                .version("1.0")
                .contact(contact)
                .description("This API exposes endpoints .").termsOfService("http://10.226.30.12:6060/auth/login")
                .license(mitLicense);

        return new OpenAPI().info(info).servers(List.of(devServer, prodServer));
    }
}