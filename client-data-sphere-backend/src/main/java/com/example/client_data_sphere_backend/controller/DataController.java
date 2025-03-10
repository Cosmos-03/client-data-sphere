package com.example.client_data_sphere_backend.controller;

import com.example.client_data_sphere_backend.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/data")
public class DataController {

    private final S3Service s3Service;

    @Autowired
    public DataController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @GetMapping("/stocks")
    public ResponseEntity<String> getStocksData(@Value("${aws.s3.bucket}") String bucket,
                                                @Value("${aws.s3.stocks.key}") String stocksKey) {
        try {
            ResponseInputStream<GetObjectResponse> response = s3Service.getDataFromS3(bucket, stocksKey);
            String data = new String(response.readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok(data);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving stocks data: " + e.getMessage());
        }
    }

    @GetMapping("/holdings")
    public ResponseEntity<String> getHoldingsData(@Value("${aws.s3.bucket}") String bucket,
                                                  @Value("${aws.s3.holdings.key}") String holdingsKey) {
        try {
            ResponseInputStream<GetObjectResponse> response = s3Service.getDataFromS3(bucket, holdingsKey);
            String data = new String(response.readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok(data);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving holdings data: " + e.getMessage());
        }
    }
}
