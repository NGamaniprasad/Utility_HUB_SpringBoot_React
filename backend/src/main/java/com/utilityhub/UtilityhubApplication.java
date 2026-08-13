package com.utilityhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UtilityhubApplication {

	public static void main(String[] args) {
		SpringApplication.run(UtilityhubApplication.class, args);
	}

}



//{
//	  "message": "First admin created successfully.",
//	  "adminId": "ADM-000001",
//	  "name": "Main Administrator",
//	  "email": "admin@utilityhub.com"
//	}
//{
//	  "adminId": "ADM-000001",
//	  "password": "Admin@12345"
//	}

//POST http://localhost:8080/api/admin/create
//Authorization: Bearer YOUR_TOKEN_HERE
//Content-Type: application/json