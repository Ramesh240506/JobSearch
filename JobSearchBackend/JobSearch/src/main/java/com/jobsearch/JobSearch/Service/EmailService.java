package com.jobsearch.JobSearch.Service;

import com.jobsearch.JobSearch.dto.FeedBack;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    JavaMailSender mailSender;

    public void sendRegistrationEmail(String to,String username) throws MessagingException {
        MimeMessage msg=mailSender.createMimeMessage();

        MimeMessageHelper msgHelper=new MimeMessageHelper(msg);

        String body="Hi " + username + ",\n\n"
                + "Thank you for registering at JobSearch Portal. We are excited to have you onboard!\n\n"
                + "Best regards,\nJobSearch Team";
        msgHelper.setTo(to);
        msgHelper.setSubject("Welcome to JobSearch Portal!");
        msgHelper.setText(body);

        mailSender.send(msg);
    }

    public void sendApplicationStatusEmail(String to, String username, String jobTitle, String status) throws MessagingException {
        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);

        String subject = "Update on your Job Application: " + jobTitle;


        String body = "<!DOCTYPE html>"
                + "<html>"
                + "<body style='font-family:Arial,sans-serif;line-height:1.6;'>"
                + "<h2 style='color:#2E86C1;'>Hello " + username + ",</h2>"
                + "<p>We wanted to update you regarding your application for the position of <b>" + jobTitle + "</b>.</p>";

        switch(status.toLowerCase()) {
            case "hired":
                body += "<p style='color:green;font-weight:bold;'>🎉 Congratulations! You have been <b>hired</b> for this position.</p>";
                body += "<p>Our team will contact you shortly with the next steps.</p>";
                break;
            case "rejected":
                body += "<p style='color:red;font-weight:bold;'>We regret to inform you that your application was <b>not selected</b> for this position.</p>";
                body += "<p>We encourage you to apply for other opportunities on JobSearch Portal.</p>";
                break;
            case "interview":
            case "interview scheduled":
                body += "<p style='color:#FFA500;font-weight:bold;'>Good news! Your <b>interview has been scheduled</b>.</p>";
                body += "<p>Please log in to your JobSearch dashboard to view the interview details.</p>";
                break;
            default:
                body += "<p>Your application status has been updated to: <b>" + status + "</b>.</p>";
        }

        body += "<br><p>Best regards,<br><b>JobSearch Team</b></p>"
                + "<hr>"
                + "<p style='font-size:0.85em;color:gray;'>This is an automated message. Please do not reply to this email.</p>"
                + "</body>"
                + "</html>";

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true);

        mailSender.send(msg);
    }

    public void sendFeedBack(FeedBack feedBack) {

        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo("rameshaathip@gmail.com");
        message.setSubject(feedBack.getSubject());
        message.setReplyTo(feedBack.getEmail());

        message.setText(
                "Name: " + feedBack.getName() + "\n" +
                        "Email: " + feedBack.getEmail() + "\n\n" +
                        feedBack.getMessage()
        );

        mailSender.send(message);
    }
}
