package com.pcp.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    @Before("execution(* com.pcp.services.*.*(..))")
    public void logBefore(JoinPoint jp) {
        System.out.println("Before method: " + jp.getSignature());
    }

    @AfterReturning(pointcut = "execution(* com.pcp.services.*.*(..))", returning = "result")
    public void logAfter(JoinPoint jp, Object result) {
        System.out.println("After method: " + jp.getSignature());
        System.out.println("Returned: " + result);
    }
}