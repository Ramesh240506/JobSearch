package com.jobsearch.JobSearch.dto;

import lombok.Data;

@Data
public class ResetPwdRequest {

    private String email;
    private String newPassword;
}
