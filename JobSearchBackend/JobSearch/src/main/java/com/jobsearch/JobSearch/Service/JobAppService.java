package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.Entity.JobApplication;
import com.jobsearch.JobSearch.Repository.JobApplicationRepo;
import com.jobsearch.JobSearch.Repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class JobAppService {

    @Autowired
    JobApplicationRepo jobApplicationRepo;

    public void saveApplication(JobApplication jobApplication, MultipartFile resumeFile) throws IOException {
        jobApplication.setResume(resumeFile.getBytes());
        jobApplicationRepo.save(jobApplication);
    }
}
