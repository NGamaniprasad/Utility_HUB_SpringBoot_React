//
//package com.utilityhub.controller;
//
//import com.utilityhub.entity.User;
//import com.utilityhub.service.UserService;
//
//import jakarta.validation.Valid;
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/users")
//@CrossOrigin(origins = "http://localhost:5173")
//public class UserController {
//
//    private final UserService userService;
//
//    public UserController(
//            UserService userService
//    ) {
//        this.userService = userService;
//    }
//
//
//    // ==========================================
//    // REGISTER
//    // ==========================================
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(
//            @Valid @RequestBody RegisterRequest request
//    ) {
//
//        try {
//
//            User user =
//                    userService.register(
//                            request.getName(),
//                            request.getEmail(),
//                            request.getPassword(),
//                            request.getConfirmPassword()
//                    );
//
//            return ResponseEntity
//                    .status(HttpStatus.CREATED)
//                    .body(
//                            new RegisterResponse(
//                                    "Account created successfully.",
//                                    user.getUserId(),
//                                    user.getName(),
//                                    user.getEmail()
//                            )
//                    );
//
//        } catch (IllegalArgumentException e) {
//
//            return ResponseEntity
//                    .badRequest()
//                    .body(
//                            new ErrorResponse(
//                                    e.getMessage()
//                            )
//                    );
//        }
//    }
//
//
//    // ==========================================
//    // LOGIN
//    // ==========================================
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(
//            @Valid @RequestBody LoginRequest request
//    ) {
//
//        try {
//
//            UserService.UserLoginResult result =
//                    userService.login(
//                            request.getEmail(),
//                            request.getPassword()
//                    );
//
//            User user =
//                    result.getUser();
//
//            return ResponseEntity.ok(
//                    new LoginResponse(
//                            "Login successful.",
//                            result.getToken(),
//                            user.getUserId(),
//                            user.getName(),
//                            user.getEmail()
//                    )
//            );
//
//        } catch (IllegalArgumentException e) {
//
//            return ResponseEntity
//                    .status(HttpStatus.UNAUTHORIZED)
//                    .body(
//                            new ErrorResponse(
//                                    e.getMessage()
//                            )
//                    );
//
//        } catch (IllegalStateException e) {
//
//            return ResponseEntity
//                    .status(HttpStatus.FORBIDDEN)
//                    .body(
//                            new ErrorResponse(
//                                    e.getMessage()
//                            )
//                    );
//        }
//    }
//
//
//    // ==========================================
//    // REGISTER REQUEST
//    // ==========================================
//
//    public static class RegisterRequest {
//
//        @NotBlank
//        private String name;
//
//        @NotBlank
//        @Email
//        private String email;
//
//        @NotBlank
//        private String password;
//
//        @NotBlank
//        private String confirmPassword;
//
//        public String getName() {
//            return name;
//        }
//
//        public void setName(String name) {
//            this.name = name;
//        }
//
//        public String getEmail() {
//            return email;
//        }
//
//        public void setEmail(String email) {
//            this.email = email;
//        }
//
//        public String getPassword() {
//            return password;
//        }
//
//        public void setPassword(String password) {
//            this.password = password;
//        }
//
//        public String getConfirmPassword() {
//            return confirmPassword;
//        }
//
//        public void setConfirmPassword(String confirmPassword) {
//            this.confirmPassword = confirmPassword;
//        }
//    }
//
//
//    // ==========================================
//    // LOGIN REQUEST
//    // ==========================================
//
//    public static class LoginRequest {
//
//        @NotBlank
//        @Email
//        private String email;
//
//        @NotBlank
//        private String password;
//
//        public String getEmail() {
//            return email;
//        }
//
//        public void setEmail(String email) {
//            this.email = email;
//        }
//
//        public String getPassword() {
//            return password;
//        }
//
//        public void setPassword(String password) {
//            this.password = password;
//        }
//    }
//
//
//    // ==========================================
//    // REGISTER RESPONSE
//    // ==========================================
//
//    public static class RegisterResponse {
//
//        private String message;
//        private String userId;
//        private String name;
//        private String email;
//
//        public RegisterResponse(
//                String message,
//                String userId,
//                String name,
//                String email
//        ) {
//            this.message = message;
//            this.userId = userId;
//            this.name = name;
//            this.email = email;
//        }
//
//        public String getMessage() {
//            return message;
//        }
//
//        public String getUserId() {
//            return userId;
//        }
//
//        public String getName() {
//            return name;
//        }
//
//        public String getEmail() {
//            return email;
//        }
//    }
//
//
//    // ==========================================
//    // LOGIN RESPONSE
//    // ==========================================
//
//    public static class LoginResponse {
//
//        private String message;
//        private String token;
//        private String userId;
//        private String name;
//        private String email;
//
//        public LoginResponse(
//                String message,
//                String token,
//                String userId,
//                String name,
//                String email
//        ) {
//            this.message = message;
//            this.token = token;
//            this.userId = userId;
//            this.name = name;
//            this.email = email;
//        }
//
//        public String getMessage() {
//            return message;
//        }
//
//        public String getToken() {
//            return token;
//        }
//
//        public String getUserId() {
//            return userId;
//        }
//
//        public String getName() {
//            return name;
//        }
//
//        public String getEmail() {
//            return email;
//        }
//    }
//
//
//    // ==========================================
//    // ERROR RESPONSE
//    // ==========================================
//
//    public static class ErrorResponse {
//
//        private String message;
//
//        public ErrorResponse(String message) {
//            this.message = message;
//        }
//
//        public String getMessage() {
//            return message;
//        }
//    }
//}
//
//


package com.utilityhub.controller;

import com.utilityhub.entity.User;
import com.utilityhub.service.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(
            UserService userService
    ) {
        this.userService = userService;
    }


    // ==========================================
    // REGISTER
    // ==========================================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        try {

            User user =
                    userService.register(
                            request.getName(),
                            request.getEmail(),
                            request.getPassword(),
                            request.getConfirmPassword()
                    );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                            new RegisterResponse(
                                    "Account created successfully.",
                                    user.getUserId(),
                                    user.getName(),
                                    user.getEmail()
                            )
                    );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            new ErrorResponse(
                                    e.getMessage()
                            )
                    );
        }
    }


    // ==========================================
    // LOGIN
    // ==========================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request
    ) {

        try {

            UserService.UserLoginResult result =
                    userService.login(
                            request.getEmail(),
                            request.getPassword()
                    );

            User user =
                    result.getUser();

            return ResponseEntity.ok(
                    new LoginResponse(
                            "Login successful.",
                            result.getToken(),
                            user.getUserId(),
                            user.getName(),
                            user.getEmail()
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            new ErrorResponse(
                                    e.getMessage()
                            )
                    );

        } catch (IllegalStateException e) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(
                            new ErrorResponse(
                                    e.getMessage()
                            )
                    );
        }
    }


    // ==========================================
    // GET PROFILE
    // ==========================================

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(
            Authentication authentication
    ) {

        try {

            String userId =
                    authentication.getName();

            User user =
                    userService.getProfile(
                            userId
                    );

            return ResponseEntity.ok(
                    new ProfileResponse(
                            user.getUserId(),
                            user.getName(),
                            user.getEmail(),
                            user.isActive()
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                            new ErrorResponse(
                                    e.getMessage()
                            )
                    );
        }
    }


    // ==========================================
    // UPDATE PROFILE
    // ==========================================

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request
    ) {

        try {

            String userId =
                    authentication.getName();

            User user =
                    userService.updateProfile(
                            userId,
                            request.getName(),
                            request.getEmail()
                    );

            return ResponseEntity.ok(
                    new ProfileResponse(
                            user.getUserId(),
                            user.getName(),
                            user.getEmail(),
                            user.isActive()
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            new ErrorResponse(
                                    e.getMessage()
                            )
                    );
        }
    }


    // ==========================================
    // CHANGE PASSWORD
    // ==========================================

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request
    ) {

        try {

            String userId =
                    authentication.getName();

            userService.changePassword(
                    userId,
                    request.getCurrentPassword(),
                    request.getNewPassword(),
                    request.getConfirmPassword()
            );

            return ResponseEntity.ok(
                    new MessageResponse(
                            "Password changed successfully."
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            new ErrorResponse(
                                    e.getMessage()
                            )
                    );
        }
    }


    // ==========================================
    // UPDATE PROFILE REQUEST
    // ==========================================

    public static class UpdateProfileRequest {

        @NotBlank
        private String name;

        @NotBlank
        @Email
        private String email;


        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }


    // ==========================================
    // CHANGE PASSWORD REQUEST
    // ==========================================

    public static class ChangePasswordRequest {

        @NotBlank
        private String currentPassword;

        @NotBlank
        private String newPassword;

        @NotBlank
        private String confirmPassword;


        public String getCurrentPassword() {
            return currentPassword;
        }

        public void setCurrentPassword(
                String currentPassword
        ) {
            this.currentPassword =
                    currentPassword;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(
                String newPassword
        ) {
            this.newPassword =
                    newPassword;
        }

        public String getConfirmPassword() {
            return confirmPassword;
        }

        public void setConfirmPassword(
                String confirmPassword
        ) {
            this.confirmPassword =
                    confirmPassword;
        }
    }


    // ==========================================
    // REGISTER REQUEST
    // ==========================================

    public static class RegisterRequest {

        @NotBlank
        private String name;

        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String password;

        @NotBlank
        private String confirmPassword;


        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getConfirmPassword() {
            return confirmPassword;
        }

        public void setConfirmPassword(
                String confirmPassword
        ) {
            this.confirmPassword =
                    confirmPassword;
        }
    }


    // ==========================================
    // LOGIN REQUEST
    // ==========================================

    public static class LoginRequest {

        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String password;


        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }


    // ==========================================
    // REGISTER RESPONSE
    // ==========================================

    public static class RegisterResponse {

        private String message;
        private String userId;
        private String name;
        private String email;


        public RegisterResponse(
                String message,
                String userId,
                String name,
                String email
        ) {
            this.message = message;
            this.userId = userId;
            this.name = name;
            this.email = email;
        }


        public String getMessage() {
            return message;
        }

        public String getUserId() {
            return userId;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }
    }


    // ==========================================
    // LOGIN RESPONSE
    // ==========================================

    public static class LoginResponse {

        private String message;
        private String token;
        private String userId;
        private String name;
        private String email;


        public LoginResponse(
                String message,
                String token,
                String userId,
                String name,
                String email
        ) {
            this.message = message;
            this.token = token;
            this.userId = userId;
            this.name = name;
            this.email = email;
        }


        public String getMessage() {
            return message;
        }

        public String getToken() {
            return token;
        }

        public String getUserId() {
            return userId;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }
    }


    // ==========================================
    // PROFILE RESPONSE
    // ==========================================

    public static class ProfileResponse {

        private String userId;
        private String name;
        private String email;
        private boolean active;


        public ProfileResponse(
                String userId,
                String name,
                String email,
                boolean active
        ) {
            this.userId = userId;
            this.name = name;
            this.email = email;
            this.active = active;
        }


        public String getUserId() {
            return userId;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }

        public boolean isActive() {
            return active;
        }
    }


    // ==========================================
    // MESSAGE RESPONSE
    // ==========================================

    public static class MessageResponse {

        private String message;


        public MessageResponse(
                String message
        ) {
            this.message = message;
        }


        public String getMessage() {
            return message;
        }
    }


    // ==========================================
    // ERROR RESPONSE
    // ==========================================

    public static class ErrorResponse {

        private String message;


        public ErrorResponse(
                String message
        ) {
            this.message = message;
        }


        public String getMessage() {
            return message;
        }
    }
}


