package org.esco.demo.ssc.web;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;

import org.esco.demo.ssc.domain.Authority;
import org.esco.demo.ssc.domain.User;
import org.esco.demo.ssc.service.UserService;
import org.esco.demo.ssc.web.rest.dto.UserDTO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("/app")
@Slf4j
public class SimpleController {


    @Inject
    private UserService userService;

    @RequestMapping("/login")
    public Object login(Model model, HttpServletRequest request) throws IOException {

        log.debug("=========> Login Call ");

        /*String then = request.getParameter("then");
        if (then != null) {
            log.debug("Going on redirect");
            // then = URLDecoder.decode(then, "UTF-8");
            String url = then;
            log.debug("url : {}", url);
            return "redirect:" + URI.create(url);
        }*/
        // retrieve the user
        User user = userService.getUserWithAuthorities();
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<String> roles = new ArrayList<>();
        for (Authority authority : user.getAuthorities()) {
            roles.add(authority.getName());
        }
        UserDTO responseUser = new UserDTO(
            user.getLogin(),
            null,
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getLangKey(),
            roles);

        log.debug("UserDetails {}", responseUser);
        //log.debug("#########   RedirectURL is present ? {}", getRedirectUrl(request));
        String uri = request.getRequestURI() + (request.getQueryString() != null ? "?" + request.getQueryString() : "");
        log.debug("#########   Requested url {}", uri);

        String jsUser = new ObjectMapper().writeValueAsString(responseUser);
        String content, type;
        if (request.getParameter("postMessage") != null) {
            log.debug("Going on postMessage");
            type = "text/html";
            content = "Login success, please wait...\n<script>\n (window.opener ? (window.opener.postMessage ? window.opener : window.opener.document) : window.parent).postMessage('loggedUser=' + JSON.stringify("
                + jsUser + "), '*');\n</script>";
        } else if (request.getParameter("callback") != null) {
            log.debug("Going on callback");
            type = "application/x-javascript";
            content = request.getParameter("callback") + "(" + jsUser + ")";
        } else {
            log.debug("Going on else");
            type = "application/json";
            content = jsUser;
        }
        log.debug("content : {}", content);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.valueOf(type));
        return new ResponseEntity<String>(content, responseHeaders, HttpStatus.OK);
    }

    // @RequestMapping("/j_spring_cas_security_logout")
    // public String spring_logout() {
    // return "redirect:/logout";
    // }

    // @RequestMapping("/logout")
    // public String logout() {
    // return "redirect:/";
    // }

    @RequestMapping(value = { "/", "" }, method = RequestMethod.GET)
    public String index(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = auth.getName();
        log.info("passing in /");
        model.addAttribute("user", user);

        // renders /WEB-INF/jsp/index.jsp
        return "index";
        // return "Hello World! (user: " + user + ")";
    }

    @RequestMapping(value = "/secure", method = RequestMethod.GET)
    public String secure(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = auth.getName();
        log.info("passing in /");
        model.addAttribute("user", user);

        // renders /WEB-INF/jsp/index.jsp
        return "secure/index";
        // return "Hello World! (user: " + user + ")";
    }

    @RequestMapping(value = "/filtered", method = RequestMethod.GET)
    public String filtered(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = auth.getName();
        log.info("passing in /");
        model.addAttribute("user", user);

        // renders /WEB-INF/jsp/index.jsp
        return "secure/admin/index";
        // return "Hello World! (user: " + user + ")";
    }

    protected String getRedirectUrl(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            SavedRequest savedRequest = new HttpSessionRequestCache().getRequest(request, null);
            if (savedRequest != null) {
                return savedRequest.getRedirectUrl();
            }
        }

		/* return a sane default in case data isn't there */
        return request.getContextPath() + "/";
    }
}
