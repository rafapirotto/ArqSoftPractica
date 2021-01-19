package com.example.billing;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.billing.interceptors.AdminRoleInterceptor;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

   @Autowired
   private AdminRoleInterceptor adminInterceptor;

   @Override
   public void addInterceptors(InterceptorRegistry registry) {

      registry
            .addInterceptor(adminInterceptor)
            .addPathPatterns(List.of("/","/previous"));

   }

}



