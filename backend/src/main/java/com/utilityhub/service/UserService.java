//
//package com.utilityhub.service;
//
//import com.utilityhub.entity.User;
//import com.utilityhub.repository.UserRepository;
//import com.utilityhub.security.UserJwtService;
//
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class UserService {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final UserJwtService userJwtService;
//
//    public UserService(
//            UserRepository userRepository,
//            PasswordEncoder passwordEncoder,
//            UserJwtService userJwtService
//    ) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.userJwtService = userJwtService;
//    }
//
//
//    // ==========================================
//    // USER REGISTRATION
//    // ==========================================
//
//    @Transactional
//    public User register(
//            String name,
//            String email,
//            String password,
//            String confirmPassword
//    ) {
//
//        if (!password.equals(confirmPassword)) {
//            throw new IllegalArgumentException(
//                    "Passwords do not match."
//            );
//        }
//
//        if (userRepository.existsByEmail(email)) {
//            throw new IllegalArgumentException(
//                    "Email is already registered."
//            );
//        }
//
//        long nextNumber =
//                userRepository.count() + 1;
//
//        String userId = String.format(
//                "UH-USR-%06d",
//                nextNumber
//        );
//
//        while (userRepository.existsByUserId(userId)) {
//
//            nextNumber++;
//
//            userId = String.format(
//                    "UH-USR-%06d",
//                    nextNumber
//            );
//        }
//
//        User user = new User();
//
//        user.setUserId(userId);
//        user.setName(name);
//        user.setEmail(email);
//
//        user.setPassword(
//                passwordEncoder.encode(password)
//        );
//
//        user.setActive(true);
//
//        return userRepository.save(user);
//    }
//
//
//    // ==========================================
//    // USER LOGIN
//    // ==========================================
//
//    public UserLoginResult login(
//            String email,
//            String password
//    ) {
//
//        User user = userRepository
//                .findByEmail(email)
//                .orElseThrow(() ->
//                        new IllegalArgumentException(
//                                "Invalid email or password."
//                        )
//                );
//
//        if (!user.isActive()) {
//            throw new IllegalStateException(
//                    "Your account is not active."
//            );
//        }
//
//        boolean passwordMatches =
//                passwordEncoder.matches(
//                        password,
//                        user.getPassword()
//                );
//
//        if (!passwordMatches) {
//            throw new IllegalArgumentException(
//                    "Invalid email or password."
//            );
//        }
//
//        String token =
//                userJwtService.generateToken(
//                        user.getUserId(),
//                        user.getEmail()
//                );
//
//        return new UserLoginResult(
//                user,
//                token
//        );
//    }
//
//
//    // ==========================================
//    // LOGIN RESULT
//    // ==========================================
//
//    public static class UserLoginResult {
//
//        private final User user;
//        private final String token;
//
//        public UserLoginResult(
//                User user,
//                String token
//        ) {
//            this.user = user;
//            this.token = token;
//        }
//
//        public User getUser() {
//            return user;
//        }
//
//        public String getToken() {
//            return token;
//        }
//    }
//}
//
//


//
//package com.utilityhub.service;
//
//import com.utilityhub.entity.User;
//import com.utilityhub.repository.UserRepository;
//import com.utilityhub.security.UserJwtService;
//
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class UserService {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final UserJwtService userJwtService;
//
//    public UserService(
//            UserRepository userRepository,
//            PasswordEncoder passwordEncoder,
//            UserJwtService userJwtService
//    ) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.userJwtService = userJwtService;
//    }
//
//
//    // ==========================================
//    // USER REGISTRATION
//    // ==========================================
//
//    @Transactional
//    public User register(
//            String name,
//            String email,
//            String password,
//            String confirmPassword
//    ) {
//
//        if (!password.equals(confirmPassword)) {
//            throw new IllegalArgumentException(
//                    "Passwords do not match."
//            );
//        }
//
//        if (userRepository.existsByEmail(email)) {
//            throw new IllegalArgumentException(
//                    "Email is already registered."
//            );
//        }
//
//        long nextNumber =
//                userRepository.count() + 1;
//
//        String userId = String.format(
//                "UH-USR-%06d",
//                nextNumber
//        );
//
//        while (userRepository.existsByUserId(userId)) {
//
//            nextNumber++;
//
//            userId = String.format(
//                    "UH-USR-%06d",
//                    nextNumber
//            );
//        }
//
//        User user = new User();
//
//        user.setUserId(userId);
//        user.setName(name);
//        user.setEmail(email);
//
//        user.setPassword(
//                passwordEncoder.encode(password)
//        );
//
//        user.setActive(true);
//
//        return userRepository.save(user);
//    }
//
//
//    // ==========================================
//    // USER LOGIN
//    // ==========================================
//
//    public UserLoginResult login(
//            String email,
//            String password
//    ) {
//
//        User user = userRepository
//                .findByEmail(email)
//                .orElseThrow(() ->
//                        new IllegalArgumentException(
//                                "Invalid email or password."
//                        )
//                );
//
//        if (!user.isActive()) {
//            throw new IllegalStateException(
//                    "Your account is not active."
//            );
//        }
//
//        boolean passwordMatches =
//                passwordEncoder.matches(
//                        password,
//                        user.getPassword()
//                );
//
//        if (!passwordMatches) {
//            throw new IllegalArgumentException(
//                    "Invalid email or password."
//            );
//        }
//
//        String token =
//                userJwtService.generateToken(
//                        user.getUserId(),
//                        user.getEmail()
//                );
//
//        return new UserLoginResult(
//                user,
//                token
//        );
//    }
//
//
//    // ==========================================
//    // GET USER PROFILE
//    // ==========================================
//
//    public User getProfile(String userId) {
//
//        return userRepository
//                .findByUserId(userId)
//                .orElseThrow(() ->
//                        new IllegalArgumentException(
//                                "User not found."
//                        )
//                );
//    }
//
//
//    // ==========================================
//    // UPDATE PROFILE
//    // ==========================================
//
//    @Transactional
//    public User updateProfile(
//            String userId,
//            String name,
//            String email
//    ) {
//
//        User user =
//                userRepository
//                        .findByUserId(userId)
//                        .orElseThrow(() ->
//                                new IllegalArgumentException(
//                                        "User not found."
//                                )
//                        );
//
//
//        // --------------------------------------
//        // VALIDATION
//        // --------------------------------------
//
//        if (name == null || name.trim().isEmpty()) {
//
//            throw new IllegalArgumentException(
//                    "Name cannot be empty."
//            );
//        }
//
//
//        if (email == null || email.trim().isEmpty()) {
//
//            throw new IllegalArgumentException(
//                    "Email cannot be empty."
//            );
//        }
//
//
//        String normalizedEmail =
//                email.trim().toLowerCase();
//
//
//        // --------------------------------------
//        // EMAIL CHANGE CHECK
//        // --------------------------------------
//
//        if (!normalizedEmail.equals(
//                user.getEmail()
//        )) {
//
//            boolean emailExists =
//                    userRepository.existsByEmail(
//                            normalizedEmail
//                    );
//
//            if (emailExists) {
//
//                throw new IllegalArgumentException(
//                        "Email is already registered."
//                );
//            }
//
//            user.setEmail(normalizedEmail);
//        }
//
//
//        // --------------------------------------
//        // UPDATE NAME
//        // --------------------------------------
//
//        user.setName(
//                name.trim()
//        );
//
//
//        return userRepository.save(user);
//    }
//
//
//    // ==========================================
//    // CHANGE PASSWORD
//    // ==========================================
//
//    @Transactional
//    public void changePassword(
//            String userId,
//            String currentPassword,
//            String newPassword,
//            String confirmPassword
//    ) {
//
//        User user =
//                userRepository
//                        .findByUserId(userId)
//                        .orElseThrow(() ->
//                                new IllegalArgumentException(
//                                        "User not found."
//                                )
//                        );
//
//
//        // --------------------------------------
//        // CURRENT PASSWORD
//        // --------------------------------------
//
//        if (currentPassword == null ||
//                currentPassword.trim().isEmpty()) {
//
//            throw new IllegalArgumentException(
//                    "Current password is required."
//            );
//        }
//
//
//        // --------------------------------------
//        // NEW PASSWORD
//        // --------------------------------------
//
//        if (newPassword == null ||
//                newPassword.trim().isEmpty()) {
//
//            throw new IllegalArgumentException(
//                    "New password is required."
//            );
//        }
//
//
//        if (newPassword.length() < 8) {
//
//            throw new IllegalArgumentException(
//                    "New password must be at least 8 characters."
//            );
//        }
//
//
//        // --------------------------------------
//        // CONFIRM PASSWORD
//        // --------------------------------------
//
//        if (!newPassword.equals(
//                confirmPassword
//        )) {
//
//            throw new IllegalArgumentException(
//                    "New passwords do not match."
//            );
//        }
//
//
//        // --------------------------------------
//        // CHECK CURRENT PASSWORD
//        // --------------------------------------
//
//        boolean passwordMatches =
//                passwordEncoder.matches(
//                        currentPassword,
//                        user.getPassword()
//                );
//
//        if (!passwordMatches) {
//
//            throw new IllegalArgumentException(
//                    "Current password is incorrect."
//            );
//        }
//
//
//        // --------------------------------------
//        // SAVE NEW PASSWORD
//        // --------------------------------------
//
//        user.setPassword(
//                passwordEncoder.encode(
//                        newPassword
//                )
//        );
//
//        userRepository.save(user);
//    }
//
//
//    // ==========================================
//    // LOGIN RESULT
//    // ==========================================
//
//    public static class UserLoginResult {
//
//        private final User user;
//        private final String token;
//
//        public UserLoginResult(
//                User user,
//                String token
//        ) {
//            this.user = user;
//            this.token = token;
//        }
//
//        public User getUser() {
//            return user;
//        }
//
//        public String getToken() {
//            return token;
//        }
//    }
//}
//
//




package com.utilityhub.service;

import com.utilityhub.entity.User;
import com.utilityhub.repository.UserRepository;
import com.utilityhub.security.UserJwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserJwtService userJwtService;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            UserJwtService userJwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userJwtService = userJwtService;
    }


    // =========================================================
    // USER REGISTRATION
    // =========================================================

    @Transactional
    public User register(
            String name,
            String email,
            String password,
            String confirmPassword
    ) {

        if (password == null ||
                confirmPassword == null ||
                !password.equals(confirmPassword)) {

            throw new IllegalArgumentException(
                    "Passwords do not match."
            );
        }

        if (userRepository.existsByEmail(email)) {

            throw new IllegalArgumentException(
                    "Email is already registered."
            );
        }

        long nextNumber =
                userRepository.count() + 1;

        String userId = String.format(
                "UH-USR-%06d",
                nextNumber
        );

        while (userRepository.existsByUserId(userId)) {

            nextNumber++;

            userId = String.format(
                    "UH-USR-%06d",
                    nextNumber
            );
        }

        User user = new User();

        user.setUserId(userId);
        user.setName(name);
        user.setEmail(email.trim().toLowerCase());

        user.setPassword(
                passwordEncoder.encode(password)
        );

        user.setActive(true);

        return userRepository.save(user);
    }


    // =========================================================
    // USER LOGIN
    // =========================================================

    public UserLoginResult login(
            String email,
            String password
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Invalid email or password."
                        )
                );

        if (!user.isActive()) {

            throw new IllegalStateException(
                    "Your account is not active."
            );
        }

        boolean passwordMatches =
                passwordEncoder.matches(
                        password,
                        user.getPassword()
                );

        if (!passwordMatches) {

            throw new IllegalArgumentException(
                    "Invalid email or password."
            );
        }

        String token =
                userJwtService.generateToken(
                        user.getUserId(),
                        user.getEmail()
                );

        return new UserLoginResult(
                user,
                token
        );
    }


    // =========================================================
    // GET USER PROFILE
    // =========================================================

    public User getProfile(String userId) {

        return userRepository
                .findByUserId(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found."
                        )
                );
    }


    // =========================================================
    // UPDATE USER PROFILE
    // =========================================================

    @Transactional
    public User updateProfile(
            String userId,
            String name,
            String email
    ) {

        User user =
                userRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "User not found."
                                )
                        );

        if (name == null ||
                name.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Name cannot be empty."
            );
        }

        if (email == null ||
                email.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Email cannot be empty."
            );
        }

        String normalizedEmail =
                email.trim().toLowerCase();

        if (!normalizedEmail.equals(
                user.getEmail()
        )) {

            if (userRepository.existsByEmail(
                    normalizedEmail
            )) {

                throw new IllegalArgumentException(
                        "Email is already registered."
                );
            }

            user.setEmail(normalizedEmail);
        }

        user.setName(name.trim());

        return userRepository.save(user);
    }


    // =========================================================
    // CHANGE USER PASSWORD
    // =========================================================

    @Transactional
    public void changePassword(
            String userId,
            String currentPassword,
            String newPassword,
            String confirmPassword
    ) {

        User user =
                userRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "User not found."
                                )
                        );

        if (currentPassword == null ||
                currentPassword.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Current password is required."
            );
        }

        if (newPassword == null ||
                newPassword.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "New password is required."
            );
        }

        if (newPassword.length() < 8) {

            throw new IllegalArgumentException(
                    "New password must be at least 8 characters."
            );
        }

        if (!newPassword.equals(
                confirmPassword
        )) {

            throw new IllegalArgumentException(
                    "New passwords do not match."
            );
        }

        boolean passwordMatches =
                passwordEncoder.matches(
                        currentPassword,
                        user.getPassword()
                );

        if (!passwordMatches) {

            throw new IllegalArgumentException(
                    "Current password is incorrect."
            );
        }

        user.setPassword(
                passwordEncoder.encode(
                        newPassword
                )
        );

        userRepository.save(user);
    }


    // =========================================================
    // ADMIN - GET ALL USERS
    // =========================================================

    public List<UserManagementResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::toUserManagementResponse)
                .toList();
    }


    // =========================================================
    // ADMIN - GET ONE USER
    // =========================================================

    public UserManagementResponse getUserForAdmin(
            String userId
    ) {

        User user =
                userRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "User not found."
                                )
                        );

        return toUserManagementResponse(user);
    }


    // =========================================================
    // ADMIN - UPDATE USER
    // =========================================================

    @Transactional
    public UserManagementResponse adminUpdateUser(
            String userId,
            AdminUpdateUserRequest request
    ) {

        User user =
                userRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "User not found."
                                )
                        );

        if (request.getName() == null ||
                request.getName().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Name cannot be empty."
            );
        }

        if (request.getEmail() == null ||
                request.getEmail().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Email cannot be empty."
            );
        }

        String normalizedEmail =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        if (!normalizedEmail.equals(
                user.getEmail()
        )) {

            if (userRepository.existsByEmail(
                    normalizedEmail
            )) {

                throw new IllegalArgumentException(
                        "Email is already registered."
                );
            }

            user.setEmail(normalizedEmail);
        }

        user.setName(
                request.getName().trim()
        );

        return toUserManagementResponse(
                userRepository.save(user)
        );
    }


    // =========================================================
    // ADMIN - ACTIVATE USER
    // =========================================================

    @Transactional
    public UserManagementResponse activateUser(
            String userId
    ) {

        User user =
                userRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "User not found."
                                )
                        );

        user.setActive(true);

        return toUserManagementResponse(
                userRepository.save(user)
        );
    }


    // =========================================================
    // ADMIN - DEACTIVATE USER
    // =========================================================

    @Transactional
    public UserManagementResponse deactivateUser(
            String userId
    ) {

        User user =
                userRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "User not found."
                                )
                        );

        user.setActive(false);

        return toUserManagementResponse(
                userRepository.save(user)
        );
    }


    // =========================================================
    // ADMIN - DELETE USER
    // =========================================================

    @Transactional
    public void deleteUser(
            String userId
    ) {

        User user =
                userRepository
                        .findByUserId(userId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "User not found."
                                )
                        );

        userRepository.delete(user);
    }


    // =========================================================
    // USER RESPONSE
    // =========================================================

    private UserManagementResponse
    toUserManagementResponse(User user) {

        return new UserManagementResponse(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.isActive()
        );
    }


    // =========================================================
    // ADMIN UPDATE REQUEST
    // =========================================================

    public static class AdminUpdateUserRequest {

        private String name;
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


    // =========================================================
    // ADMIN USER RESPONSE
    // =========================================================

    public static class UserManagementResponse {

        private final String userId;
        private final String name;
        private final String email;
        private final boolean active;


        public UserManagementResponse(
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


    // =========================================================
    // LOGIN RESULT
    // =========================================================

    public static class UserLoginResult {

        private final User user;
        private final String token;


        public UserLoginResult(
                User user,
                String token
        ) {

            this.user = user;
            this.token = token;
        }


        public User getUser() {
            return user;
        }


        public String getToken() {
            return token;
        }
    }
}
